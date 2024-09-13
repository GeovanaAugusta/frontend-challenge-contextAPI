import { ItemMod } from "../../../Interfaces/MenuI";
import { ItemWithQuantity } from "../../MenuItems/interface";

export interface ModalBasketI {
    calculateTotal: () => number;
    handleMinus: (index: number) => void;
    handlePlus: (index: number) => void;
    onClose: () => void;
} 