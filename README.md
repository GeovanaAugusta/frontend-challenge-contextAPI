# Front End Challenge

Este projeto foi desenvolvido com o objetivo de criar uma aplicação que exibe os detalhes de um restaurante e seu menu, permitindo que o cliente adicione itens ao carrinho.

## Visão Geral

Este projeto simula o menu de um restaurante, permitindo que os usuários visualizem os itens disponíveis e os adicionem ao carrinho de compras. O foco principal é na organização do código, na componentização, na responsividade e na experiência do usuário.

## Tecnologias Utilizadas

- **React** - Biblioteca principal para construção da interface.
- **Typescript** - Utilizado para garantir tipagem estática e evitar erros em tempo de execução.
- **ES6+** - Padrões modernos de JavaScript.
- **React Hooks** - Para gerenciar estados e efeitos colaterais de forma mais eficiente.
- **ContextAPI** - Utilizado para o gerenciamento global de estado da aplicação.
- **React Testing Library** - Para criação de testes unitários nos componentes.
- **CSS3** - Para estilização e responsividade.

## Como Rodar o Projeto

### Pré-requisitos

- Node.js (versão 16 ou superior)
- NPM ou Yarn

### Passos para rodar o projeto

1. **Clone o repositório**
   ```bash
   git clone git@github.com:GeovanaAugusta/frontend-challenge-contextAPI.git
   cd frontend-challenge-contextAPI
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```
   ou

   ```bash
   yarn install
   ```  

3. **Execute a aplicação**
   ```bash
   npm start
   ```
   ou

   ```bash
   yarn start
   ```  

    O frontend estará acessível em `http://localhost:3000`.

## Decisões Técnicas

- Utilização de ContextAPI para gerenciar o estado global, simplificando a troca de informações entre os componentes sem a necessidade de passar props manualmente.
- A escolha de React Hooks foi feita para facilitar o gerenciamento de estados e side effects de forma mais clara e concisa.
- Componentização do projeto para facilitar a manutenção e a legibilidade do código.
- Responsividade foi implementada com media queries, garantindo que o projeto funcione bem em telas de diferentes tamanhos.

## Testes
- Os testes foram implementados utilizando a React Testing Library para garantir que os componentes funcionam como esperado.

## Funcionalidades Implementadas

- Visualização do menu do restaurante.
- Adição de itens ao carrinho.
- Atualização de quantidade de itens no carrinho.
- Cálculo dinâmico do preço total com base nos itens selecionados e suas quantidades.
- Modal para detalhes do produto com opções de personalização (escolha de adicionais).

## Deploy
O projeto pode ser acessado em [url] para que a aplicação possa ser visualizada sem necessidade de rodar localmente.

    
