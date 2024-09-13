import React, { useEffect, useState } from 'react';
import '../styles.css';
import { INITIAL_LAYOUT_STATE } from './constants';
import MenuIcon from '../../assets/icons/menu.png';
import ModalMenu from '../Modals/ModalMenu/app';

const Menu = () => {
  const [state, setState] = useState(INITIAL_LAYOUT_STATE);

  // Resize
  useEffect(() => {
    const handleResize = () => {
      setState((prev) => ({
        ...prev,
        isMobile: window.innerWidth < 1000,
      }));
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleClick = (buttonName: string) => {
    setState((prev) => ({
      ...prev,
      selectedButton: buttonName
    }));
  };

  const toggleModal = () => {
    setState((prev) => ({
      ...prev,
      isModalOpen: !prev.isModalOpen,
    }));
  };

  return (
    <>
      {!state.isMobile ? (
        <nav>
          <header className="container-nav">
            <button
              className={`nav ${state.selectedButton === 'MENU' ? 'nav-selected' : ''}`}
              onClick={() => handleClick('MENU')}
            >
              MENU
            </button>
            <button
              className={`nav ${state.selectedButton === 'ENTRAR' ? 'nav-selected' : ''}`}
              onClick={() => handleClick('ENTRAR')}
            >
              ENTRAR
            </button>
            <button
              className={`nav ${state.selectedButton === 'CONTATO' ? 'nav-selected' : ''}`}
              onClick={() => handleClick('CONTATO')}
            >
              CONTATO
            </button>
          </header>
        </nav>
      ) : (
        <>
          <nav>
            <header className="container-nav nav-mobile">
              <p className="title-nav text-center">Menu</p>
              <img className="img-nav-m" src={MenuIcon} alt="Open Menu" onClick={toggleModal} />
            </header>
          </nav>

          {state.isModalOpen && (
            <ModalMenu onToggleModal={toggleModal} />
          )}
        </>
      )}
    </>
  );
};

export default Menu;