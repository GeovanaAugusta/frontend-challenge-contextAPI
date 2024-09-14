import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { INITIAL_STATE } from '../components/MenuItems/constants';
import { ItemMod, Items, Sections } from '../Interfaces/MenuI';
import { ItemWithQuantity } from '../components/MenuItems/interface';

interface GlobalState {
    isDesktop: boolean;
    isMobile: boolean;
    isModalOpen: boolean;
    isModalOpenBasket: boolean;
    isModifier: boolean;
    menu: Sections[];
    selectedItem: Items;
    selectedModifier: ItemMod[];
    selectedId: number;
    updatedPrice: number;
    updatedQuantity: number;
    selectedItemIndex: number;
    updatedItems: ItemWithQuantity[];
    locale: string;
    currency: string;
    productCounter: number[];
    total: number[];
    searchTerm: string;
    productCounterDetails: { [key: string]: number };
    selectedItemId: string;
    selectedItemQuantity: number;
    selectedItemObject: { [key: string]: number };
    itemPrice: number;
    updateProductCounter: number;
}

interface GlobalContextProps {
    state: GlobalState;
    setState: React.Dispatch<React.SetStateAction<GlobalState>>;
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
    const [state, setState] = useState<GlobalState>(() => {
        const savedState = localStorage.getItem('cartState');
        return savedState ? JSON.parse(savedState) : INITIAL_STATE;
    });

    useEffect(() => {
        localStorage.setItem('cartState', JSON.stringify(state));
    }, [state]);

    return (
        <GlobalContext.Provider value={{ state, setState }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('useGlobalContext deve ser usado dentro de um GlobalProvider');
    }
    return context;
};
