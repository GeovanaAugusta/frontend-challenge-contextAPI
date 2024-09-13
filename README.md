# Front End Challenge

This project was developed to create an application that displays restaurant details and its menu, allowing the customer to add items to the cart.

## Overview

This project simulates a restaurant menu, enabling users to view available items and add them to their shopping cart. The main focus is on code organization, componentization, responsiveness, and user experience.

## Technologies Used

- **React** - Main library for building the interface.
- **Typescript** - Used to ensure static typing and prevent runtime errors.
- **ES6+** - Modern JavaScript standards.
- **React Hooks** - For efficient state management and side effects handling.
- **ContextAPI** - Used for global state management within the application.
- **React Testing Library** - For unit testing components.
- **CSS3** - For styling and responsiveness.

## How to Run the Project

### Prerequisites

- Node.js (version 16 or higher)
- NPM or Yarn

### Steps to run the project

1. **Clone the repository**
   ```bash
   git clone git@github.com:GeovanaAugusta/frontend-challenge-contextAPI.git
   cd frontend-challenge-contextAPI
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   or

   ```bash
   yarn install
   ```  

3. **Run the application**
   ```bash
   npm start
   ```
   or

   ```bash
   yarn start
   ```  

    The frontend will be accessible at `http://localhost:3000`.

## Decisões Técnicas

- ContextAPI was used for global state management, simplifying information exchange between components without manually passing props.
- React Hooks were chosen to manage states and side effects more clearly and concisely.
- The project was componentized to make maintenance easier and improve code readability.
- Responsiveness was implemented using media queries to ensure the project works well across different screen sizes.

## Testes
- Unit tests were implemented using React Testing Library to ensure components work as expected.

## Funcionalidades Implementadas

- View the restaurant's menu.
- Add items to the shopping cart.
- Update the quantity of items in the cart.
- Dynamic total price calculation based on selected items and quantities.
- Product detail modal with customization options (choose modifiers).
- Internationalization for texts.
- Internationalization for money.
- Unit tests with React Testing Library.

## Deploy
The project can be accessed at [url], allowing the application to be viewed without needing to run locally.

    
