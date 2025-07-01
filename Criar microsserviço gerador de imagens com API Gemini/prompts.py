from flask import Blueprint, request, jsonify, session
from src.models.image_generation import db, PromptTemplate
from sqlalchemy import or_
import json
import uuid

prompts_bp = Blueprint('prompts', __name__)

@prompts_bp.route('/templates', methods=['GET'])
def get_prompt_templates():
    """Get prompt templates with filtering"""
    try:
        # Query parameters
        category = request.args.get('category', 'all')
        style = request.args.get('style', 'all')
        search = request.args.get('search', '')
        featured_only = request.args.get('featured', False, type=bool)
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 20, type=int)
        
        # Base query
        query = PromptTemplate.query.filter_by(public=True)
        
        # Apply filters
        if category != 'all':
            query = query.filter_by(category=category)
        
        if style != 'all':
            query = query.filter_by(style=style)
        
        if featured_only:
            query = query.filter_by(featured=True)
        
        if search:
            search_term = f"%{search}%"
            query = query.filter(
                or_(
                    PromptTemplate.title.ilike(search_term),
                    PromptTemplate.prompt.ilike(search_term),
                    PromptTemplate.description.ilike(search_term)
                )
            )
        
        # Order by usage count and creation date
        query = query.order_by(
            PromptTemplate.featured.desc(),
            PromptTemplate.usage_count.desc(),
            PromptTemplate.created_at.desc()
        )
        
        # Paginate
        templates = query.paginate(
            page=page, per_page=per_page, error_out=False
        )
        
        return jsonify({
            'templates': [template.to_dict() for template in templates.items],
            'pagination': {
                'page': page,
                'per_page': per_page,
                'total': templates.total,
                'pages': templates.pages,
                'has_next': templates.has_next,
                'has_prev': templates.has_prev
            },
            'filters': {
                'category': category,
                'style': style,
                'search': search,
                'featured_only': featured_only
            }
        })
        
    except Exception as e:
        return jsonify({'error': f'Erro ao buscar templates: {str(e)}'}), 500

@prompts_bp.route('/template/<template_id>', methods=['GET'])
def get_prompt_template(template_id):
    """Get specific prompt template"""
    try:
        template = PromptTemplate.query.get(template_id)
        if not template or not template.public:
            return jsonify({'error': 'Template não encontrado'}), 404
        
        return jsonify(template.to_dict())
        
    except Exception as e:
        return jsonify({'error': f'Erro ao buscar template: {str(e)}'}), 500

@prompts_bp.route('/template/<template_id>/use', methods=['POST'])
def use_prompt_template(template_id):
    """Track usage of a prompt template"""
    try:
        template = PromptTemplate.query.get(template_id)
        if not template:
            return jsonify({'error': 'Template não encontrado'}), 404
        
        template.usage_count += 1
        db.session.commit()
        
        return jsonify({
            'success': True,
            'template': template.to_dict()
        })
        
    except Exception as e:
        return jsonify({'error': f'Erro ao usar template: {str(e)}'}), 500

@prompts_bp.route('/template/<template_id>/like', methods=['POST'])
def like_prompt_template(template_id):
    """Like a prompt template"""
    try:
        template = PromptTemplate.query.get(template_id)
        if not template:
            return jsonify({'error': 'Template não encontrado'}), 404
        
        template.likes += 1
        db.session.commit()
        
        return jsonify({
            'success': True,
            'likes': template.likes
        })
        
    except Exception as e:
        return jsonify({'error': f'Erro ao curtir template: {str(e)}'}), 500

@prompts_bp.route('/categories', methods=['GET'])
def get_prompt_categories():
    """Get available prompt categories"""
    try:
        categories = db.session.query(
            PromptTemplate.category,
            db.func.count(PromptTemplate.id).label('count')
        ).filter_by(public=True).group_by(PromptTemplate.category).all()
        
        category_list = []
        for category, count in categories:
            category_list.append({
                'id': category,
                'name': get_category_display_name(category),
                'count': count
            })
        
        return jsonify({
            'categories': category_list
        })
        
    except Exception as e:
        return jsonify({'error': f'Erro ao buscar categorias: {str(e)}'}), 500

@prompts_bp.route('/styles', methods=['GET'])
def get_prompt_styles():
    """Get available prompt styles"""
    try:
        styles = db.session.query(
            PromptTemplate.style,
            db.func.count(PromptTemplate.id).label('count')
        ).filter_by(public=True).group_by(PromptTemplate.style).all()
        
        style_list = []
        for style, count in styles:
            style_list.append({
                'id': style,
                'name': get_style_display_name(style),
                'count': count
            })
        
        return jsonify({
            'styles': style_list
        })
        
    except Exception as e:
        return jsonify({'error': f'Erro ao buscar estilos: {str(e)}'}), 500

@prompts_bp.route('/featured', methods=['GET'])
def get_featured_templates():
    """Get featured prompt templates"""
    try:
        limit = request.args.get('limit', 8, type=int)
        
        templates = PromptTemplate.query.filter_by(
            featured=True,
            public=True
        ).order_by(PromptTemplate.usage_count.desc()).limit(limit).all()
        
        return jsonify({
            'featured_templates': [template.to_dict() for template in templates]
        })
        
    except Exception as e:
        return jsonify({'error': f'Erro ao buscar templates em destaque: {str(e)}'}), 500

@prompts_bp.route('/popular', methods=['GET'])
def get_popular_templates():
    """Get most popular prompt templates"""
    try:
        limit = request.args.get('limit', 10, type=int)
        
        templates = PromptTemplate.query.filter_by(public=True).order_by(
            PromptTemplate.usage_count.desc()
        ).limit(limit).all()
        
        return jsonify({
            'popular_templates': [template.to_dict() for template in templates]
        })
        
    except Exception as e:
        return jsonify({'error': f'Erro ao buscar templates populares: {str(e)}'}), 500

@prompts_bp.route('/search', methods=['GET'])
def search_templates():
    """Search prompt templates"""
    try:
        query_text = request.args.get('q', '')
        category = request.args.get('category')
        style = request.args.get('style')
        
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 20, type=int)
        
        # Build query
        query = PromptTemplate.query.filter_by(public=True)
        
        if query_text:
            search_term = f"%{query_text}%"
            query = query.filter(
                or_(
                    PromptTemplate.title.ilike(search_term),
                    PromptTemplate.prompt.ilike(search_term),
                    PromptTemplate.description.ilike(search_term)
                )
            )
        
        if category:
            query = query.filter_by(category=category)
        
        if style:
            query = query.filter_by(style=style)
        
        # Order by relevance (usage count)
        query = query.order_by(PromptTemplate.usage_count.desc())
        
        # Paginate results
        results = query.paginate(
            page=page, per_page=per_page, error_out=False
        )
        
        return jsonify({
            'results': [template.to_dict() for template in results.items],
            'pagination': {
                'page': page,
                'per_page': per_page,
                'total': results.total,
                'pages': results.pages,
                'has_next': results.has_next,
                'has_prev': results.has_prev
            },
            'search_params': {
                'query': query_text,
                'category': category,
                'style': style
            }
        })
        
    except Exception as e:
        return jsonify({'error': f'Erro na busca: {str(e)}'}), 500

@prompts_bp.route('/stats', methods=['GET'])
def get_prompt_stats():
    """Get prompt template statistics"""
    try:
        total_templates = PromptTemplate.query.filter_by(public=True).count()
        total_usage = db.session.query(db.func.sum(PromptTemplate.usage_count)).scalar() or 0
        total_likes = db.session.query(db.func.sum(PromptTemplate.likes)).scalar() or 0
        
        # Most used categories
        popular_categories = db.session.query(
            PromptTemplate.category,
            db.func.sum(PromptTemplate.usage_count).label('total_usage')
        ).filter_by(public=True).group_by(PromptTemplate.category).order_by(
            db.func.sum(PromptTemplate.usage_count).desc()
        ).limit(5).all()
        
        # Most used styles
        popular_styles = db.session.query(
            PromptTemplate.style,
            db.func.sum(PromptTemplate.usage_count).label('total_usage')
        ).filter_by(public=True).group_by(PromptTemplate.style).order_by(
            db.func.sum(PromptTemplate.usage_count).desc()
        ).limit(5).all()
        
        return jsonify({
            'total_templates': total_templates,
            'total_usage': total_usage,
            'total_likes': total_likes,
            'popular_categories': [
                {
                    'category': cat,
                    'name': get_category_display_name(cat),
                    'usage': usage
                }
                for cat, usage in popular_categories
            ],
            'popular_styles': [
                {
                    'style': style,
                    'name': get_style_display_name(style),
                    'usage': usage
                }
                for style, usage in popular_styles
            ]
        })
        
    except Exception as e:
        return jsonify({'error': f'Erro ao buscar estatísticas: {str(e)}'}), 500

def get_category_display_name(category):
    """Get display name for category"""
    category_names = {
        'business': 'Negócios',
        'product': 'Produtos',
        'people': 'Pessoas',
        'lifestyle': 'Lifestyle',
        'nature': 'Natureza',
        'technology': 'Tecnologia',
        'food': 'Alimentação',
        'travel': 'Viagem',
        'fashion': 'Moda',
        'art': 'Arte',
        'architecture': 'Arquitetura',
        'interior': 'Interiores'
    }
    return category_names.get(category, category.title())

def get_style_display_name(style):
    """Get display name for style"""
    style_names = {
        'professional': 'Profissional',
        'creative': 'Criativo',
        'corporate': 'Corporativo',
        'lifestyle': 'Lifestyle',
        'product': 'Produto',
        'minimal': 'Minimalista',
        'artistic': 'Artístico',
        'documentary': 'Documental',
        'fashion': 'Moda',
        'portrait': 'Retrato'
    }
    return style_names.get(style, style.title())

# Initialize sample prompt templates
def init_sample_prompt_templates():
    """Initialize sample prompt templates if empty"""
    try:
        if PromptTemplate.query.count() == 0:
            sample_templates = [
                {
                    'title': 'Executivo Profissional',
                    'prompt': 'Um executivo confiante em um escritório moderno, terno elegante, luz natural suave, fotografia profissional, alta qualidade, foco nítido',
                    'description': 'Template para retratos profissionais de executivos em ambiente corporativo',
                    'category': 'business',
                    'style': 'professional',
                    'usage_count': 245,
                    'likes': 89,
                    'featured': True
                },
                {
                    'title': 'Produto Tecnológico',
                    'prompt': 'Produto tecnológico elegante em fundo minimalista branco, iluminação suave e uniforme, fotografia comercial de alta qualidade, detalhes nítidos',
                    'description': 'Ideal para fotografias comerciais de produtos tecnológicos',
                    'category': 'product',
                    'style': 'product',
                    'usage_count': 189,
                    'likes': 67,
                    'featured': True
                },
                {
                    'title': 'Equipe Colaborativa',
                    'prompt': 'Equipe diversa colaborando em escritório moderno, ambiente dinâmico e inspirador, luz natural, fotografia documental, energia positiva',
                    'description': 'Para capturar momentos de colaboração em equipe',
                    'category': 'people',
                    'style': 'documentary',
                    'usage_count': 156,
                    'likes': 78,
                    'featured': True
                },
                {
                    'title': 'Lifestyle Urbano',
                    'prompt': 'Pessoa jovem em ambiente urbano moderno, estilo de vida contemporâneo, cores vibrantes, fotografia lifestyle, autêntico e natural',
                    'description': 'Para fotografias de lifestyle em ambiente urbano',
                    'category': 'lifestyle',
                    'style': 'lifestyle',
                    'usage_count': 134,
                    'likes': 45,
                    'featured': False
                },
                {
                    'title': 'Arquitetura Moderna',
                    'prompt': 'Edifício moderno com design arquitetônico inovador, linhas limpas, iluminação dramática, perspectiva interessante, fotografia arquitetônica',
                    'description': 'Template para fotografia de arquitetura contemporânea',
                    'category': 'architecture',
                    'style': 'professional',
                    'usage_count': 98,
                    'likes': 34,
                    'featured': False
                },
                {
                    'title': 'Chef Gourmet',
                    'prompt': 'Chef profissional preparando prato gourmet em cozinha moderna, iluminação dramática, foco nos detalhes, fotografia gastronômica de alta qualidade',
                    'description': 'Para fotografias de chefs e gastronomia',
                    'category': 'food',
                    'style': 'professional',
                    'usage_count': 87,
                    'likes': 29,
                    'featured': False
                },
                {
                    'title': 'Startup Inovadora',
                    'prompt': 'Jovens empreendedores em espaço de coworking moderno, energia criativa, tecnologia e inovação, ambiente colaborativo, fotografia documental',
                    'description': 'Ideal para capturar o ambiente de startups e inovação',
                    'category': 'business',
                    'style': 'creative',
                    'usage_count': 76,
                    'likes': 41,
                    'featured': False
                },
                {
                    'title': 'Modelo Fashion',
                    'prompt': 'Modelo de moda em estúdio minimalista, iluminação suave e profissional, estética contemporânea, fotografia de moda, elegante e sofisticado',
                    'description': 'Template para fotografia de moda e retratos elegantes',
                    'category': 'fashion',
                    'style': 'fashion',
                    'usage_count': 65,
                    'likes': 52,
                    'featured': False
                }
            ]
            
            for template_data in sample_templates:
                template = PromptTemplate(**template_data)
                db.session.add(template)
            
            db.session.commit()
            print("✅ Templates de prompt de exemplo inicializados")
            
    except Exception as e:
        print(f"❌ Erro ao inicializar templates de prompt: {e}")
        db.session.rollback()

