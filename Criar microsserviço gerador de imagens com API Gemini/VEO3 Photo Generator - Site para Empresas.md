# VEO3 Photo Generator - Site para Empresas

Um site completo e moderno para empresas que desejam gerar fotos profissionais usando inteligência artificial VEO3.

## 🎯 Características Principais

### 🎨 Design Moderno e Minimalista
- Interface clean e profissional
- Sistema de temas (escuro/claro) personalizáveis
- Design responsivo para desktop e mobile
- Animações suaves e transições elegantes

### 🤖 Gerador de Fotos VEO3
- Interface intuitiva para geração de imagens
- 5 estilos profissionais (Profissional, Criativo, Corporativo, Lifestyle, Produto)
- 4 proporções de imagem (1:1, 16:9, 9:16, 4:3)
- Controle de qualidade (Rápida → Ultra HD)
- Prompts sugeridos e geração aleatória
- Campo de prompt com contador de caracteres

### 🖼️ Galeria de Inspiração
- Galeria organizada por categorias
- Filtros por tipo (Negócios, Produtos, Pessoas, Lifestyle)
- Sistema de likes, visualizações e downloads
- Informações detalhadas de cada imagem
- Tags e metadados completos

### 📝 Sistema de Prompts
- Templates de prompts otimizados
- Categorização por tipo e estilo
- Estatísticas de uso e popularidade
- API completa para gerenciamento

## 🚀 Tecnologias Utilizadas

### Frontend
- **HTML5** - Estrutura semântica
- **CSS3** - Estilos modernos com variáveis CSS
- **JavaScript (Vanilla)** - Interatividade e funcionalidades
- **Design Responsivo** - Mobile-first approach

### Backend
- **Python Flask** - Framework web
- **SQLAlchemy** - ORM para banco de dados
- **SQLite** - Banco de dados
- **Flask-CORS** - Suporte a CORS
- **Python-dotenv** - Gerenciamento de variáveis de ambiente

## 📁 Estrutura do Projeto

```
veo3-backend/
├── src/
│   ├── main.py                 # Aplicação principal Flask
│   ├── models/                 # Modelos do banco de dados
│   │   ├── user.py            # Modelo de usuário
│   │   └── image_generation.py # Modelos de imagem, galeria e prompts
│   ├── routes/                 # Rotas da API
│   │   ├── user.py            # Rotas de usuário
│   │   ├── image_generation.py # Rotas de geração de imagem
│   │   ├── gallery.py         # Rotas da galeria
│   │   └── prompts.py         # Rotas de prompts
│   ├── services/              # Serviços
│   │   └── veo3_service.py    # Integração com VEO3 API
│   ├── static/                # Frontend (HTML, CSS, JS)
│   │   ├── index.html         # Página principal
│   │   ├── assets/            # Assets do frontend
│   │   │   ├── css/           # Estilos CSS
│   │   │   ├── js/            # JavaScript
│   │   │   └── images/        # Imagens
│   │   └── uploads/           # Uploads de imagens
│   └── database/              # Banco de dados SQLite
├── venv/                      # Ambiente virtual Python
├── requirements.txt           # Dependências Python
├── .env                       # Variáveis de ambiente
└── README.md                  # Esta documentação
```

## 🛠️ Instalação e Configuração

### 1. Pré-requisitos
- Python 3.8+ instalado
- pip (gerenciador de pacotes Python)

### 2. Instalação

```bash
# Clone ou extraia o projeto
cd veo3-backend

# Ative o ambiente virtual
source venv/bin/activate

# Instale as dependências
pip install -r requirements.txt
```

### 3. Configuração

Edite o arquivo `.env` com suas configurações:

```env
FLASK_ENV=development
SECRET_KEY=veo3_secret_key_2024
VEO3_API_KEY=sua_chave_veo3_aqui
UPLOAD_FOLDER=uploads
MAX_CONTENT_LENGTH=16777216
CORS_ORIGINS=*
```

### 4. Execução

```bash
# Inicie o servidor
python src/main.py

# O site estará disponível em:
# http://localhost:5000
```

## 🔧 API Endpoints

### Geração de Imagens
- `POST /api/images/generate` - Gerar nova imagem
- `POST /api/images/edit` - Editar imagem existente
- `GET /api/images/history` - Histórico de gerações

### Galeria
- `GET /api/gallery/items` - Listar itens da galeria
- `GET /api/gallery/item/<id>` - Obter item específico
- `POST /api/gallery/item/<id>/like` - Curtir item
- `GET /api/gallery/categories` - Listar categorias
- `GET /api/gallery/featured` - Itens em destaque

### Prompts
- `GET /api/prompts/templates` - Listar templates
- `GET /api/prompts/template/<id>` - Obter template específico
- `POST /api/prompts/template/<id>/use` - Usar template
- `GET /api/prompts/categories` - Listar categorias
- `GET /api/prompts/featured` - Templates em destaque

### Sistema
- `GET /api/health` - Verificação de saúde

## 🎨 Personalização de Temas

O site inclui um sistema avançado de temas personalizáveis:

### Temas Pré-definidos
- **Escuro** - Tema padrão com cores escuras
- **Claro** - Tema claro para ambientes bem iluminados

### Personalização
Edite as variáveis CSS em `assets/css/themes.css`:

```css
:root {
  --primary-color: #2563EB;
  --secondary-color: #7C3AED;
  --accent-color: #10B981;
  --background-color: #0F172A;
  --surface-color: #1E293B;
  --text-primary: #F8FAFC;
  --text-secondary: #CBD5E1;
}
```

## 📊 Dados de Exemplo

O sistema inclui dados de exemplo para demonstração:

### Galeria
- 4 imagens de exemplo em diferentes categorias
- Metadados completos (autor, data, estatísticas)
- Tags e descrições

### Templates de Prompt
- 8 templates otimizados para diferentes casos de uso
- Categorização por tipo e estilo
- Estatísticas de uso

## 🔒 Segurança

### Medidas Implementadas
- **CORS** configurado para requisições seguras
- **Validação de entrada** em todos os endpoints
- **Limitação de tamanho** para uploads (16MB)
- **Sanitização** de dados de entrada
- **Variáveis de ambiente** para configurações sensíveis

## 📱 Responsividade

O site é totalmente responsivo e otimizado para:
- **Desktop** (1920px+)
- **Laptop** (1024px - 1919px)
- **Tablet** (768px - 1023px)
- **Mobile** (320px - 767px)

## 🚀 Deploy em Produção

### Opções de Deploy
1. **Servidor VPS** - Upload direto para servidor
2. **Docker** - Containerização para deploy
3. **Cloud Platforms** - Heroku, AWS, Google Cloud

### Configurações de Produção
```env
FLASK_ENV=production
DEBUG=False
SECRET_KEY=chave_secreta_forte
VEO3_API_KEY=chave_real_veo3
```

## 🔧 Manutenção

### Logs
Os logs são exibidos no console durante execução:
```
✅ VEO3 Backend inicializado com sucesso!
📁 Diretório de uploads: /path/to/uploads
🗄️ Banco de dados: sqlite:///path/to/database
🚀 Iniciando VEO3 Backend na porta 5000
```

### Backup do Banco de Dados
```bash
# Backup
cp src/database/app.db backup_$(date +%Y%m%d).db

# Restauração
cp backup_20240101.db src/database/app.db
```

## 🆘 Solução de Problemas

### Problemas Comuns

**Erro de porta em uso:**
```bash
# Mude a porta no .env
PORT=5001
```

**Erro de dependências:**
```bash
# Reinstale as dependências
pip install -r requirements.txt --force-reinstall
```

**Banco de dados corrompido:**
```bash
# Remova e recrie o banco
rm src/database/app.db
python src/main.py
```

## 📞 Suporte

Para suporte técnico ou dúvidas:
- Consulte a documentação da API VEO3
- Verifique os logs do servidor
- Teste os endpoints individualmente

## 📄 Licença

Este projeto foi desenvolvido como uma solução personalizada para geração de fotos empresariais usando VEO3 AI.

---

**VEO3 Photo Generator** - Transformando ideias em imagens profissionais com IA 🚀

