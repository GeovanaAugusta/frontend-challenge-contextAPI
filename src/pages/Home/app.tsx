import { useEffect, useState } from 'react';
import MenuItems from '../../components/MenuItems/app';
import { INITIAL_LAYOUT_STATE } from './constants';
import './styles.css';

const Home = () => {
  const [state, setState] = useState(INITIAL_LAYOUT_STATE);

  // Resize 
  useEffect(() => {
    const handleResize = () => {
      setState((prev) => ({
        ...prev,
        isDesktop: window.innerWidth === 1480,
      }));
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className={`container-search ${state.isDesktop ? 'desktop-search' : ''}`}>
      <MenuItems />    
    </section>
  );
};

export default Home;
