import { Items } from "../../Interfaces/MenuI";

export interface ItemWithQuantity {
    item: Items;
    quantity: number;
    price?: number
  }