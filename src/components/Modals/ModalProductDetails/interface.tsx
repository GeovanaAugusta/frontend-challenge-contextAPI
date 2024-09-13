import { ItemMod, Items } from "../../../Interfaces/MenuI";

export interface ModalI {
  onClose: () => void;
  onOpen: () => void;
  onPriceUpdate: (price: number) => void;
  onProductCounter: (item: Items, price: number, isModifier: boolean, selectedModifier: ItemMod[], itemPrice: number, callback: () => void) => void;
} 