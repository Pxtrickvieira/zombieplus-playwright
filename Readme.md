# 🧪 ZombiePlus – Testes Automatizados (Playwright)

Este repositório contém a suíte de testes automatizados do **ZombiePlus**,  
um projeto ainda em evolução voltado para estudos avançados de automação de testes end-to-end.

O foco principal é garantir a qualidade dos fluxos de:
- Login  
- Cadastro de filmes  
- Pré-cadastro de leads  
- Validação visual e funcional de componentes essenciais da aplicação  

---

## 🛠 Tecnologias utilizadas
- **Playwright**
- **Node.js**
- **JavaScript 
- **Faker.js** 
- **PostgreSQL** 
- **GitHub Actions** 
---

## 📁 Estrutura do projeto

```text
zombieplus/
│── pages/                 → Page Objects (POM)
│── tests/
│    └── e2e/              → Cenários de testes
│── support/               → Fixtures, DB, utilitários
│── playwright.config.js
└── package.json

▶️ Como executar

1️⃣ Instalar dependências

- npm install

2️⃣ Executar os testes (modo headless)

- npx playwright test

3️⃣ Visualizar o relatório dos testes

- npx playwright show-report

📌 Status do projeto
🚧 Em desenvolvimento
Novas funcionalidades, cenários e integrações continuam sendo adicionados conforme o avanço dos estudos e práticas de QA.
