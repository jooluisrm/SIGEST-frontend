# SIGEST - Sistema de Gestão Escolar (Frontend)

👋 Bem-vindo ao repositório do frontend do SIGEST, o nosso Sistema de Gestão Escolar. Esta aplicação foi desenvolvida com o objetivo de fornecer uma interface moderna, rápida e intuitiva para administrar as operações de uma instituição de ensino.

Este projeto foi construído utilizando **[Next.js](https://nextjs.org/)**, um framework React que possibilita a criação de aplicações web de alto desempenho com renderização tanto no lado do servidor (SSR) quanto no lado do cliente (CSR).

## ✨ Funcionalidades Principais

* 📱 Design responsivo, adaptável a desktops, tablets e smartphones.
* 🧑‍🏫 Cadastro de Professor.
* 🚧 (Em breve mais funcionalidades)

## 🚀 Tecnologias Utilizadas

Este projeto foi desenvolvido com as seguintes tecnologias e ferramentas:

* **[Next.js](https://nextjs.org/)**: Framework React para produção.
* **[React](https://react.dev/)**: Biblioteca para construção de interfaces de usuário.
* **[TypeScript](https://www.typescriptlang.org/)**: Superset do JavaScript que adiciona tipagem estática.
* **[Tailwind CSS](https://tailwindcss.com/)**: Framework de CSS utility-first para estilização rápida.
* **[shadcn/ui](https://ui.shadcn.com/)**: Coleção de componentes de UI reutilizáveis construídos sobre Radix UI e Tailwind CSS.

## ⚙️ Como Rodar o Projeto Localmente

Para executar este projeto em seu ambiente de desenvolvimento, siga os passos abaixo.

### ✅ **Pré-requisitos**

* Certifique-se de ter o **[Node.js](https://nodejs.org/en)** (versão 18.x ou superior) instalado em sua máquina.
* Garanta que a **API backend do SIGEST** esteja rodando localmente. As instruções de instalação dela estão em seu respectivo repositório.

### 🔢 **Passo a Passo**

1.  **Clone o repositório**:
    ```bash
    git clone [https://github.com/jooluisrm/SIGEST-frontend](https://github.com/jooluisrm/SIGEST-frontend)
    ```

2.  **Acesse o diretório do projeto:**
    ```bash
    cd SIGEST-frontend
    ```

3.  **Instale as dependências** (escolha seu gerenciador de pacotes preferido):
    ```bash
    npm install
    # ou
    yarn install
    # ou
    pnpm install
    ```

4.  🔑 **Configure as Variáveis de Ambiente**:
    * Na raiz do projeto, renomeie o arquivo `.env.example` para `.env`.
    * Abra o novo arquivo `.env` e adicione a URL base da sua API local:
    ```env
    NEXT_PUBLIC_API_BASE_URL=[http://127.0.0.1:8000/](http://127.0.0.1:8000/)
    ```

5.  **Execute o servidor de desenvolvimento:**
    ```bash
    npm run dev
    # ou
    yarn dev
    # ou
    pnpm dev
    ```

6.  **Acesse a aplicação:**
    🎉 Abra seu navegador e acesse **[http://localhost:3000](http://localhost:3000)** para ver o resultado.
