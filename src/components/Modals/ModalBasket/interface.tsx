import { ItemMod } from "../../../Interfaces/MenuI";
import { ItemWithQuantity } from "../../MenuItems/interface";

export interface ModalBasketI {
    calculateTotal: () => number;
    locale: string;
    currency: string;
    updatedQuantity: number;
    productCounter: number[];
    updatedItems: ItemWithQuantity[];
    handleMinus: (index: number) => void;
    handlePlus: (index: number) => void;
    onClose: () => void;
    selectedModifier: ItemMod[],
} 