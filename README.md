# 🏙️ VCidade — Backend

Backend da plataforma **VCidade**, uma aplicação desenvolvida para facilitar o acesso da população a informações públicas sobre municípios do estado do Rio de Janeiro.

A API funciona como uma camada intermediária entre o aplicativo e fontes externas de dados, permitindo consultar municípios e informações relacionadas à criminalidade de forma estruturada e simplificada.

> 🚧 **Projeto em desenvolvimento**

---

## 📌 Sobre o projeto

O **VCidade** tem como objetivo centralizar informações relevantes para os cidadãos, apresentando dados públicos de maneira simples, acessível e compreensível.

Nesta etapa, o backend é responsável principalmente por consultar informações de municípios e ocorrências relacionadas à criminalidade através da API do **Fogo Cruzado**.

A aplicação também possui mecanismos de validação das requisições e uma estrutura organizada para facilitar a manutenção e evolução do projeto.

---

## ✨ Funcionalidades

Atualmente, o backend disponibiliza:

- 🔎 Consulta de cidades;
- 🚨 Consulta de ocorrências de criminalidade;
- 🏘️ Filtragem de ocorrências por bairro;
- 📅 Consulta de ocorrências referentes ao último ano;
- ✅ Validação dos parâmetros recebidos;
- ❌ Tratamento de erros de validação e recursos não encontrados;
- 🔐 Autenticação com a API do Fogo Cruzado;
- 🌐 API REST utilizando Express;
- 🔄 Integração com serviços externos utilizando Axios.

As consultas de criminalidade são realizadas considerando um intervalo de aproximadamente um ano até a data atual.

---

## 🛠️ Tecnologias

| Tecnologia | Utilização |
|---|---|
| **Node.js** | Runtime da aplicação |
| **JavaScript** | Linguagem principal |
| **Express** | Construção da API REST |
| **Axios** | Comunicação com APIs externas |
| **CORS** | Controle de acesso entre origens |
| **dotenv** | Gerenciamento de variáveis de ambiente |
| **Nodemon** | Desenvolvimento e reinicialização automática |
| **Fogo Cruzado API** | Fonte dos dados de ocorrências |

As dependências atuais do projeto podem ser consultadas no `package.json`.

---

## 📁 Estrutura do projeto

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
│   │   └── ValidationError.js
│   │
│   ├── helpers/
│   │   ├── format.js
│   │   └── logIn-fogo-cruzado.js
│   │
│   ├── middlewares/
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

### 🧩 Organização

O projeto segue uma separação de responsabilidades:

**Routes → Middlewares → Controllers → Services → API externa**

- **Routes:** define os endpoints disponíveis.
- **Middlewares:** valida e prepara os parâmetros das requisições.
- **Controllers:** recebe as requisições e retorna as respostas.
- **Services:** concentra a lógica de negócio e comunicação com serviços externos.
- **Config:** configura clientes utilizados pela aplicação.
- **Helpers:** reúne funções auxiliares.
- **Errors:** padroniza erros específicos da aplicação.

Por exemplo, a rota de crimes passa pelos middlewares de validação antes de chegar ao controller.

---

# 🚀 Instalação

## Pré-requisitos

Antes de executar o projeto, tenha instalado:

- [Node.js](https://nodejs.org/)
- npm

Recomenda-se utilizar uma versão recente do Node.js compatível com ES Modules.

---

## 📥 Clonando o projeto

```bash
git clone https://github.com/ryancpsilva/vcidade_back.git

cd vcidade_back
```

---

## 📦 Instalando as dependências

```bash
npm install
```

---

# 🔐 Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
PORT=3000

FOGO_CRUZADO_EMAIL=seu_email
FOGO_CRUZADO_PASSWORD=sua_senha
```

> ⚠️ **Nunca publique suas credenciais no GitHub.**
>
> O arquivo `.env` deve permanecer fora do controle de versão.

A aplicação utiliza variáveis de ambiente para configurar a execução do servidor e as credenciais utilizadas na autenticação do serviço externo.

---

# ▶️ Executando o projeto

Para iniciar o servidor em modo de desenvolvimento:

```bash
npm run dev
```

O script utiliza o **Nodemon** para reiniciar automaticamente o servidor quando houver alterações no código.

Por padrão:

```text
http://localhost:3000
```

A porta pode ser alterada através da variável:

```env
PORT=3000
```

---

# 🔌 Endpoints

## 🏙️ Cidades

### Buscar cidades

```http
GET /cities
```

Também é possível realizar uma busca pelo nome da cidade:

```http
GET /cities?city=NomeDaCidade
```

Exemplo:

```http
GET /cities?city=Niterói
```

A aplicação utiliza o serviço de cidades para consultar a API externa e retorna os dados encontrados.

---

# 🚨 Crimes

## Consultar ocorrências de uma cidade

```http
GET /crimes?city=NomeDaCidade
```

Exemplo:

```http
GET /crimes?city=Niterói
```

A consulta busca as ocorrências registradas para a cidade dentro do intervalo de aproximadamente **um ano até a data atual**.

---

## 🏘️ Consultar ocorrências por bairro

É possível combinar cidade e bairro:

```http
GET /crimes?city=Niterói&neighborhood=Centro
```

Nesse caso, o backend primeiro obtém as ocorrências da cidade e posteriormente filtra os resultados pelo bairro informado.

---

# ✅ Validação

O backend possui validações para evitar requisições inválidas.

### Cidade

A cidade:

- não pode conter números;
- deve possuir pelo menos 2 caracteres;
- passa por remoção de espaços desnecessários.

Exemplo inválido:

```http
GET /cities?city=Niteroi123
```

Resposta:

```json
{
  "error": "A requisição não pode conter números"
}
```



### Bairro

O bairro:

- não pode conter números;
- deve possuir pelo menos 2 caracteres;
- deve conter apenas letras e espaços.

Exemplo:

```http
GET /crimes?city=Niterói&neighborhood=Centro123
```

Resposta:

```json
{
  "error": "Neighborhood não pode conter números"
}
```



---

# 🔐 Integração com o Fogo Cruzado

O VCidade utiliza a API do **Fogo Cruzado** como fonte externa para obtenção das ocorrências.

A comunicação é realizada através do Axios, utilizando uma instância configurada com a URL base:

```text
https://api-service.fogocruzado.org.br/api/v2
```

A autenticação é realizada através de um token Bearer.

As consultas de ocorrências utilizam informações como:

- período inicial;
- período final;
- estado;
- cidade;
- paginação.



---

# 🧱 Arquitetura

O fluxo básico de uma requisição pode ser representado da seguinte maneira:

```text
                    Cliente
                       │
                       ▼
                  ┌─────────┐
                  │  Route  │
                  └────┬────┘
                       │
                       ▼
                ┌─────────────┐
                │  Middleware │
                │  Validação  │
                └──────┬──────┘
                       │
                       ▼
                 ┌───────────┐
                 │ Controller│
                 └─────┬─────┘
                       │
                       ▼
                  ┌─────────┐
                  │ Service │
                  └────┬────┘
                       │
                       ▼
              ┌─────────────────┐
              │ Fogo Cruzado API│
              └─────────────────┘
```

Essa divisão permite manter a lógica de negócio separada da camada responsável pelas requisições HTTP.

---

# 🧪 Testes

O projeto ainda não possui uma suíte de testes automatizados configurada.

Atualmente, o script `test` do `package.json` está definido como:

```bash
npm test
```

mas retorna uma mensagem informando que os testes ainda não foram implementados.

### Próximos passos sugeridos

- [ ] Implementar testes unitários;
- [ ] Implementar testes de integração;
- [ ] Testar middlewares;
- [ ] Testar controllers;
- [ ] Testar services;
- [ ] Testar respostas da API externa utilizando mocks.

---
