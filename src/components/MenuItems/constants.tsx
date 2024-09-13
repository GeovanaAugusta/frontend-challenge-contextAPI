import { ItemMod, Items, Sections } from "../../Interfaces/MenuI";
import { ItemWithQuantity } from "./interface";


export const INITIAL_STATE = {
  isDesktop: false,
  isMobile: false,
  isModalOpen: false,
  isModalOpenBasket: false,
  isModifier: false,
  menu: [] as Sections[],
  selectedItem: {} as Items,
  selectedModifier: [] as ItemMod[],
  selectedId: 0,
  updatedPrice: 0,
  updatedQuantity: 0,
  selectedItemIndex: 0,
  updatedItems: [] as ItemWithQuantity[],
  locale: 'pt-BR',
  currency: 'BRL',
  productCounter: [] as number[],
  total: [] as number[],
  searchTerm: '',
  productCounterDetails: {} as { [key: string]: number },
  selectedItemId: '',
  selectedItemQuantity: 0,
  selectedItemObject: {} as { [key: string]: number },
  itemPrice: 0,
}