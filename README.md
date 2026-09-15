# 🏙️ VCidade Backend

Backend da plataforma **VCidade**, desenvolvido para disponibilizar informações públicas de municípios do estado do Rio de Janeiro de forma organizada e acessível.

A aplicação funciona como uma API intermediária entre o cliente e serviços externos, realizando consultas, validações, tratamento de erros e organização dos dados antes de disponibilizá-los.

> 🚧 **Projeto em desenvolvimento**

---

## 📌 Sobre o projeto

O **VCidade** tem como objetivo facilitar o acesso da população a informações públicas relacionadas aos municípios do estado do Rio de Janeiro.

Nesta etapa, o backend possui integração com a API do **Fogo Cruzado**, permitindo consultar cidades e ocorrências registradas no estado.

Além da integração externa, o projeto possui uma estrutura organizada em camadas, com separação entre rotas, middlewares, controllers, services, configurações, helpers e tratamento de erros.

---

## ✨ Funcionalidades

Atualmente, o backend possui:

- 🔎 Consulta de cidades;
- 🚨 Consulta de ocorrências de uma cidade;
- 🏘️ Consulta de ocorrências por bairro;
- 📅 Consulta de ocorrências referentes ao último ano;
- 🔐 Autenticação com a API do Fogo Cruzado;
- ✅ Validação dos parâmetros das requisições;
- ❌ Tratamento centralizado de erros;
- ⚠️ Validação de cidades retornadas pela API externa;
- 🌐 API REST;
- 🔄 Comunicação com serviços externos utilizando Axios.

---

## 🛠️ Tecnologias

| Tecnologia | Utilização |
|---|---|
| **Node.js** | Ambiente de execução |
| **JavaScript** | Linguagem principal |
| **Express 5** | Construção da API REST |
| **Axios** | Comunicação com APIs externas |
| **CORS** | Configuração de acesso entre origens |
| **dotenv** | Carregamento das variáveis de ambiente |
| **Nodemon** | Reinicialização automática durante o desenvolvimento |
| **Fogo Cruzado API** | Fonte das ocorrências |

---

# 🏗️ Arquitetura

O projeto utiliza uma organização baseada na separação de responsabilidades:

```text
Cliente
   │
   ▼
 Routes
   │
   ▼
 Middlewares
   │
   ▼
 Controllers
   │
   ▼
 Services
   │
   ▼
 Fogo Cruzado API
```

O tratamento de erros segue um fluxo centralizado:

```text
Controller / Service
        │
        ▼
    AppError
        │
        ▼
  errorHandler
        │
        ▼
   HTTP Response
```

Essa organização permite manter a lógica de negócio separada da camada HTTP e centralizar o tratamento das exceções.

---

# 📁 Estrutura do projeto

```text
vcidade_back/
│
├── src/
│   ├── config/
│   │   └── axios.js
│   │
│   ├── controllers/
│   │   ├── cityController.js
│   │   └── crimeController.js
│   │
│   ├── errors/
│   │   ├── AppError.js
│   │   ├── NotFoundError.js
│   │   ├── UnauthorizedError.js
│   │   └── ValidationError.js
│   │
│   ├── helpers/
│   │   ├── format.js
│   │   └── logIn-fogo-cruzado.js
│   │
│   ├── middlewares/
│   │   ├── errorHandler.js
│   │   ├── validateCity.js
│   │   └── validateNeighborhood.js
│   │
│   ├── routes/
│   │   ├── cityRoutes.js
│   │   └── crimeRoutes.js
│   │
│   ├── services/
│   │   ├── cityService.js
│   │   └── crimeService.js
│   │
│   ├── app.js
│   └── server.js
│
├── .env
├── .gitignore
├── package.json
└── package-lock.json
```

### Responsabilidade das camadas

#### `routes`

Define os endpoints disponíveis e os middlewares executados antes dos controllers.

#### `middlewares`

Responsáveis pelas validações das requisições e pelo tratamento global de erros.

#### `controllers`

Recebem as requisições HTTP, chamam os services e retornam os resultados ao cliente.

#### `services`

Concentram a lógica de negócio e a comunicação com a API do Fogo Cruzado.

#### `errors`

Contém as classes utilizadas para representar erros controlados da aplicação.

#### `helpers`

Contém funções auxiliares utilizadas pelo restante da aplicação.

#### `config`

Contém a configuração da instância do Axios utilizada para comunicação com a API externa.

---

# 🚀 Instalação

## Pré-requisitos

É necessário possuir instalado:

- [Node.js](https://nodejs.org/)
- npm

O projeto utiliza **ES Modules**.

---

## 📥 Clonar o repositório

```bash
git clone https://github.com/ryancpsilva/vcidade_back.git
cd vcidade_back
```

## 📦 Instalar dependências

```bash
npm install
```

---

# 🔐 Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
PORT=3000

EMAIL_FOGO_CRUZADO=seu_email
PASSWORD_FOGO_CRUZADO=sua_senha
```

As credenciais são utilizadas para realizar a autenticação na API do Fogo Cruzado.

> ⚠️ **Nunca publique suas credenciais no GitHub.**

O `.gitignore` do projeto já contempla o arquivo `.env`.

---

# ▶️ Executando o projeto

Para iniciar o servidor em modo de desenvolvimento:

```bash
npm run dev
```

O comando utiliza o Nodemon e executa:

```text
src/server.js
```

Por padrão, a aplicação utiliza a porta:

```text
3000
```

A porta pode ser alterada através da variável `PORT`.

---

# 🔌 API

## 🏙️ Cidades

### Listar cidades

```http
GET /cities
```

Retorna as cidades disponíveis através da API do Fogo Cruzado.

### Buscar uma cidade

```http
GET /cities?city=Niterói
```

O parâmetro `city` permite pesquisar uma cidade específica.

### Exemplo

```bash
curl "http://localhost:3000/cities?city=Niterói"
```

---

# 🚨 Ocorrências

## Consultar ocorrências de uma cidade

```http
GET /crimes?city=Niterói
```

O parâmetro `city` é obrigatório para a consulta de ocorrências.

A busca considera:

- Estado do Rio de Janeiro;
- cidade informada;
- período de um ano até a data atual.

### Exemplo

```bash
curl "http://localhost:3000/crimes?city=Niterói"
```

---

## 🏘️ Consultar ocorrências por bairro

É possível filtrar as ocorrências utilizando o parâmetro `neighborhood`.

```http
GET /crimes?city=Niterói&neighborhood=Centro
```

Nesse caso, a aplicação:

1. valida a cidade;
2. valida o bairro;
3. busca as ocorrências da cidade;
4. filtra os resultados pelo bairro informado.

### Exemplo

```bash
curl "http://localhost:3000/crimes?city=Niterói&neighborhood=Centro"
```

---

# ✅ Validações

O backend possui middlewares específicos para validar os parâmetros recebidos.

## Cidade

O parâmetro `city`:

- não pode conter números;
- deve possuir pelo menos dois caracteres;
- possui seus espaços externos removidos antes de ser utilizado.

Exemplos inválidos:

```text
city=Niterói123
```

```text
city=A
```

As requisições inválidas geram um `ValidationError` com status HTTP `400`.

---

## Bairro

O parâmetro `neighborhood`:

- não pode conter números;
- deve possuir pelo menos dois caracteres;
- deve conter apenas letras e espaços;
- tem espaços externos removidos antes do processamento.

Exemplos inválidos:

```text
neighborhood=Centro123
```

```text
neighborhood=A
```

```text
neighborhood=Centro@123
```

---

# ❌ Tratamento de erros

O projeto possui um sistema centralizado de tratamento de erros.

A classe `AppError` serve como base para os erros controlados da aplicação.

A partir dela são definidos erros específicos:

| Erro | Status HTTP | Utilização |
|---|---:|---|
| `ValidationError` | `400` | Dados ou parâmetros inválidos |
| `UnauthorizedError` | `401` | Falha de autenticação |
| `NotFoundError` | `404` | Recurso não encontrado |
| `AppError` | Variável | Erro controlado da aplicação |
| Erro não tratado | `500` | Erro interno do servidor |

O middleware `errorHandler` centraliza esses erros e retorna uma resposta padronizada.

### Exemplo

```json
{
  "error": "Cidade não encontrada"
}
```

Para erros que não são instâncias de `AppError`, o backend retorna:

```json
{
  "error": "Erro interno do servidor"
}
```

---

# 🔐 Autenticação

A aplicação utiliza as credenciais configuradas no `.env` para realizar login na API do Fogo Cruzado.

O processo é realizado pelo helper:

```text
src/helpers/logIn-fogo-cruzado.js
```

O token retornado pela autenticação é utilizado na configuração do Axios:

```text
src/config/axios.js
```

A API externa utilizada pelo projeto possui como base:

```text
https://api-service.fogocruzado.org.br/api/v2
```

> Atualmente, o projeto realiza a autenticação durante a inicialização da aplicação. Não há implementação de renovação automática do token no código atual.

---

# 🔎 Validação dos dados retornados

Além da validação dos parâmetros recebidos, o backend também realiza uma verificação sobre os dados retornados pela API externa.

Durante a consulta de ocorrências, a cidade retornada pela API é comparada com a cidade solicitada pelo usuário.

Para essa comparação, o projeto utiliza um helper que:

- converte o texto para letras minúsculas;
- remove acentos;
- remove espaços.

Isso permite realizar comparações como:

```text
"Niterói"
```

e

```text
"niteroi"
```

sem que diferenças de acentuação ou capitalização interfiram na comparação.

---

# 🧪 Testes

O projeto ainda não possui uma suíte de testes automatizados implementada.

O script atualmente disponível é:

```bash
npm test
```

Por enquanto, esse comando informa que os testes ainda não foram especificados.

### Próximos testes

Algumas possibilidades para evolução:

- [ ] Testes dos middlewares;
- [ ] Testes das classes de erro;
- [ ] Testes dos controllers;
- [ ] Testes dos services;
- [ ] Testes de integração das rotas;
- [ ] Mock da API do Fogo Cruzado.
      
---

# 🎯 Objetivo

O VCidade busca tornar informações públicas mais acessíveis para a população.

A proposta é utilizar uma interface simples para que o cidadão consiga consultar informações sobre seu município sem precisar lidar diretamente com diferentes APIs ou fontes de dados.

O backend é responsável por realizar essa integração, validar as solicitações, processar os dados e disponibilizá-los de maneira estruturada para o aplicativo.

---
