# Microsserviço Gerador de Imagens Gemini

Um microsserviço completo para geração de imagens realistas e consistentes usando a API Gemini do Google.

## 🚀 Características

- **Geração de Imagens**: Crie imagens a partir de descrições textuais
- **Múltiplos Estilos**: Realista, Cartoon, Pintura Artística, Arte Digital, Vintage, Minimalista
- **Diferentes Proporções**: Quadrado (1:1), Paisagem (16:9), Retrato (9:16)
- **Sistema de Sessões**: Mantenha consistência entre gerações
- **Histórico Completo**: Visualize e gerencie todas as imagens geradas
- **Interface Responsiva**: Funciona perfeitamente em desktop e mobile
- **API REST**: Endpoints para integração com outros sistemas

## 🛠️ Tecnologias Utilizadas

- **Backend**: Flask (Python)
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Banco de Dados**: SQLite
- **IA**: Google Gemini API
- **Processamento de Imagens**: Pillow (PIL)

## 📋 Pré-requisitos

- Python 3.11+
- Chave da API Gemini do Google
- pip (gerenciador de pacotes Python)

## 🔧 Instalação

1. **Clone ou baixe o projeto**
```bash
cd gemini-image-generator
```

2. **Ative o ambiente virtual**
```bash
source venv/bin/activate  # Linux/Mac
# ou
venv\Scripts\activate     # Windows
```

3. **Instale as dependências**
```bash
pip install -r requirements.txt
```

4. **Configure a chave da API**
```bash
export GEMINI_API_KEY=sua_chave_aqui
```

Ou edite o arquivo `.env`:
```
GEMINI_API_KEY=sua_chave_aqui
FLASK_ENV=development
SECRET_KEY=sua_chave_secreta
```

## 🚀 Execução

### Desenvolvimento
```bash
python src/main.py
```

O servidor estará disponível em: `http://localhost:5000`

### Produção
```bash
gunicorn -w 4 -b 0.0.0.0:5000 src.main:app
```

## 📖 Como Usar

### Interface Web

1. **Acesse** `http://localhost:5000` no seu navegador
2. **Digite** uma descrição detalhada da imagem desejada
3. **Selecione** o estilo artístico
4. **Escolha** a proporção da imagem
5. **Clique** em "Gerar Imagem"
6. **Aguarde** a geração (alguns segundos)
7. **Visualize** o resultado e faça download se desejar

### API REST

#### Gerar Imagem
```bash
POST /api/generate
Content-Type: application/json

{
  "prompt": "Um gato laranja fofo sentado em uma janela",
  "style": "realista",
  "aspect_ratio": "square",
  "session_id": "opcional"
}
```

#### Editar Imagem
```bash
POST /api/edit
Content-Type: multipart/form-data

prompt: "Adicione uma borboleta na janela"
image: [arquivo de imagem]
session_id: "opcional"
```

#### Histórico
```bash
GET /api/history?session_id=opcional&limit=10&offset=0
```

#### Status da API
```bash
GET /api/health
```

## 📁 Estrutura do Projeto

```
gemini-image-generator/
├── src/
│   ├── main.py              # Aplicação principal
│   ├── models/              # Modelos do banco de dados
│   │   ├── user.py
│   │   └── image_generation.py
│   ├── routes/              # Rotas da API
│   │   ├── user.py
│   │   └── image_generation.py
│   ├── services/            # Serviços de negócio
│   │   └── gemini_service.py
│   └── static/              # Arquivos estáticos
│       ├── index.html
│       ├── styles.css
│       ├── script.js
│       └── images/          # Imagens geradas
├── venv/                    # Ambiente virtual
├── requirements.txt         # Dependências
├── .env                     # Variáveis de ambiente
└── README.md               # Este arquivo
```

## 🔧 Configuração Avançada

### Variáveis de Ambiente

```bash
GEMINI_API_KEY=sua_chave_da_api_gemini
FLASK_ENV=development|production
SECRET_KEY=chave_secreta_para_sessoes
DATABASE_URL=sqlite:///app.db  # Opcional
```

### Personalização

#### Estilos Disponíveis
- `realista`: Imagens fotorrealistas
- `cartoon`: Estilo cartoon/animação
- `pintura`: Estilo de pintura artística
- `digital`: Arte digital moderna
- `vintage`: Estilo retrô/vintage
- `minimalista`: Design minimalista

#### Proporções Suportadas
- `square`: 1:1 (512x512)
- `landscape`: 16:9 (768x432)
- `portrait`: 9:16 (432x768)

## 🔒 Segurança

- Validação de entrada em todos os endpoints
- Sanitização de uploads de arquivos
- Limitação de tamanho de arquivos
- Proteção CSRF
- Headers de segurança configurados

## 📊 Monitoramento

### Logs
Os logs são salvos automaticamente e incluem:
- Requisições de geração
- Tempos de resposta
- Erros e exceções
- Uso da API Gemini

### Métricas
- Número de imagens geradas
- Tempo médio de geração
- Estilos mais populares
- Sessões ativas

## 🐛 Solução de Problemas

### Erro: "GEMINI_API_KEY não encontrada"
```bash
export GEMINI_API_KEY=sua_chave_aqui
```

### Erro: "Port 5000 is in use"
```bash
python src/main.py --port 5001
```

### Erro de dependências
```bash
pip install -r requirements.txt --force-reinstall
```

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 🆘 Suporte

Para suporte técnico ou dúvidas:
- Abra uma issue no repositório
- Consulte a documentação da API Gemini
- Verifique os logs da aplicação

## 🔄 Atualizações

### v1.0.0
- ✅ Geração básica de imagens
- ✅ Interface web responsiva
- ✅ Sistema de sessões
- ✅ Histórico de gerações
- ✅ API REST completa
- ✅ Múltiplos estilos e proporções

### Próximas Versões
- 🔄 Edição avançada de imagens
- 🔄 Batch processing
- 🔄 Integração com cloud storage
- 🔄 Sistema de usuários
- 🔄 Analytics avançado

---

**Desenvolvido com ❤️ usando Flask e Gemini AI**

