import React from 'react';
import './App.css';
import Home from './pages/Home/app';
import Header from './components/Header/app';
import './index.css';
import Menu from './components/Menu/app';
import { LanguageProvider } from './utils/locales/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <Menu />
      <Header />
      <Home />
    </LanguageProvider>
  );
}

export default App;
