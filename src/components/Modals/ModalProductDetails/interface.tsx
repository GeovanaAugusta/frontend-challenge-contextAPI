import { ItemMod, Items } from "../../../Interfaces/MenuI";
import { ItemWithQuantity } from "../../MenuItems/interface";

export interface ModalI {
  onClose: () => void;
  onOpen: () => void;
  onPriceUpdate: (price: number) => void;
  onProductCounter: (item: Items, price: number, isModifier: boolean, selectedModifier: ItemMod[], itemPrice: number) => void;
  productCounter: number[];
  selectedItemObject: { [key: string]: number },
  updatedItems: ItemWithQuantity[],
} 