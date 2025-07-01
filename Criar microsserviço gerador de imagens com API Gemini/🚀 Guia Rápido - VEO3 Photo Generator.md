# 🚀 Guia Rápido - VEO3 Photo Generator

## ⚡ Início Rápido (5 minutos)

### 1. Executar o Site
```bash
cd veo3-backend
source venv/bin/activate
python src/main.py
```
Acesse: `http://localhost:5000`

### 2. Gerar Primeira Foto
1. Clique em **"Gerar Primeira Foto"** ou vá para a seção **Gerador**
2. Escolha um **estilo** (ex: Profissional)
3. Selecione a **proporção** (ex: 16:9)
4. Digite um **prompt** ou use um dos sugeridos
5. Clique em **"Gerar Foto"**

### 3. Explorar a Galeria
1. Vá para a seção **Galeria**
2. Use os **filtros** por categoria
3. Clique em **"Visualizar"** para ver detalhes
4. Use **"Download"** para baixar imagens

### 4. Alterar Tema
- Clique no **ícone de tema** no canto superior direito
- Alterna entre tema escuro e claro

## 🎯 Funcionalidades Principais

### Gerador VEO3
- **5 Estilos**: Profissional, Criativo, Corporativo, Lifestyle, Produto
- **4 Proporções**: 1:1, 16:9, 9:16, 4:3
- **Qualidade Ajustável**: Rápida → Ultra HD
- **Prompts Sugeridos**: Botões com exemplos prontos
- **Prompt Aleatório**: Geração automática de prompts

### Galeria
- **Filtros**: Todas, Negócios, Produtos, Pessoas, Lifestyle
- **Informações**: Autor, data, estatísticas, tags
- **Ações**: Visualizar, download, curtir
- **Busca**: Campo de busca integrado

### Sistema de Temas
- **Tema Escuro**: Padrão, ideal para trabalho noturno
- **Tema Claro**: Alternativo, ideal para ambientes claros
- **Personalização**: Editável via CSS

## 📱 Uso Mobile

O site é totalmente responsivo:
- **Menu**: Hambúrguer em telas pequenas
- **Gerador**: Interface adaptada para touch
- **Galeria**: Grid responsivo
- **Temas**: Funcionam em todos os dispositivos

## 🔧 Configuração Rápida

### Variáveis de Ambiente (.env)
```env
VEO3_API_KEY=sua_chave_aqui    # Chave da API VEO3
PORT=5000                      # Porta do servidor
FLASK_ENV=development          # Ambiente de desenvolvimento
```

### Integração VEO3 Real
1. Obtenha sua chave API VEO3
2. Edite o arquivo `.env`
3. Substitua `VEO3_API_KEY=sua_chave_aqui`
4. Reinicie o servidor

## 🎨 Personalização Rápida

### Cores do Tema
Edite `assets/css/themes.css`:
```css
:root {
  --primary-color: #2563EB;     # Cor principal
  --secondary-color: #7C3AED;   # Cor secundária
  --accent-color: #10B981;      # Cor de destaque
}
```

### Logo e Branding
1. Substitua o logo em `assets/images/`
2. Edite o título em `index.html`
3. Atualize as cores no CSS

## 📊 Monitoramento

### Logs do Sistema
```bash
# Logs aparecem no terminal:
✅ VEO3 Backend inicializado com sucesso!
🚀 Iniciando VEO3 Backend na porta 5000
```

### Verificação de Saúde
Acesse: `http://localhost:5000/api/health`
```json
{
  "status": "healthy",
  "service": "VEO3 Photo Generator API"
}
```

## 🔍 Solução Rápida de Problemas

### Porta em Uso
```bash
# Use porta diferente
PORT=5001 python src/main.py
```

### Erro de Dependências
```bash
# Reinstale
pip install -r requirements.txt
```

### Banco de Dados
```bash
# Reset completo
rm src/database/app.db
python src/main.py
```

## 📈 Próximos Passos

### Para Desenvolvimento
1. **Integrar API VEO3 real**
2. **Adicionar autenticação de usuários**
3. **Implementar sistema de pagamentos**
4. **Adicionar mais estilos e filtros**

### Para Produção
1. **Configurar HTTPS**
2. **Usar banco PostgreSQL**
3. **Implementar CDN para imagens**
4. **Configurar monitoramento**

## 💡 Dicas de Uso

### Prompts Eficazes
- **Seja específico**: "executiva confiante" vs "pessoa"
- **Inclua contexto**: "em escritório moderno"
- **Defina estilo**: "fotografia profissional"
- **Mencione iluminação**: "luz natural suave"

### Melhores Práticas
- **Use proporção 16:9** para banners
- **Use 1:1** para redes sociais
- **Qualidade Ultra HD** para impressão
- **Qualidade Rápida** para testes

---

**🎯 Objetivo**: Gerar fotos profissionais de alta qualidade para empresas usando VEO3 AI de forma rápida e intuitiva!

