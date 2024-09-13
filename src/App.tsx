import './App.css';
import Home from './pages/Home/app';
import Header from './components/Header/app';
import './index.css';
import Menu from './components/Menu/app';
import { LanguageProvider } from './utils/locales/LanguageContext';
import { GlobalProvider } from './context/global-context';

function App() {
  return (
    <GlobalProvider>
      <LanguageProvider>
        <Menu />
        <Header />
        <Home />
      </LanguageProvider>
    </GlobalProvider>
  );
}

export default App;
