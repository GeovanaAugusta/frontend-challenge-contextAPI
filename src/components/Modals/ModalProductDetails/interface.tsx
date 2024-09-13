import { ItemMod, Items } from "../../../Interfaces/MenuI";
import { ItemWithQuantity } from "../../MenuItems/interface";

export interface ModalI {
  item: Items,
  onClose: () => void;
  onOpen: () => void;
  onPriceUpdate: (price: number) => void;
  onProductCounter: (item: Items, price: number, isModifier: boolean, selectedModifier: ItemMod[], itemPrice: number) => void;
  locale: string;
  currency: string;
  productCounter: number[];
  selectedItemObject: { [key: string]: number },
  selectedModifier: ItemMod[],
  itemPrice: number,
  updatedItems: ItemWithQuantity[],
} 