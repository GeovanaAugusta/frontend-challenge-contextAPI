export interface ModalBasketI {
    calculateTotal: () => number;
    handleMinus: (index: number) => void;
    handlePlus: (index: number) => void;
    onClose: () => void;
} 