🧟‍♂️ ZombiePlus – Testes Automatizados (Playwright)

Este repositório contém a suíte de testes automatizados do ZombiePlus, um projeto ainda em evolução voltado para estudos avançados de automação de testes end-to-end.

O foco principal é garantir a qualidade do fluxo de login, cadastro de filmes, pré-cadastro de leads e validação visual de componentes essenciais da aplicação.

 – Tecnologias utilizadas

Playwright (E2E Testing)

Node.js

JavaScript (ES Modules)

Faker.js (geração de massa de dados)

PostgreSQL (validação e limpeza de massa via SQL)

GitHub Actions (pipeline de testes – em andamento)

📁 Estrutura do projeto
zombieplus/
 ├── pages/               → Page Objects (POM)
 ├── tests/
 │   ├── e2e/             → Cenários de testes
 │   └── support/         → Fixtures, DB, utilitários
 ├── playwright.config.js
 └── package.json

- Como executar
1️⃣ Instalar dependências
npm install

2️⃣ Executar os testes (modo headless)
npx playwright test

3️⃣ Visualizar o relatório dos testes
npx playwright show-report

📌 Status do projeto

🔧 Em desenvolvimento
Novas funcionalidades, cenários e integrações continuam sendo adicionadas conforme o avanço dos estudos e práticas de QA.