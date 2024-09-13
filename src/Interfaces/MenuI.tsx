export interface MenuI {
  id: number;
  name: string;
  type: string;
  collapse: number;
  sections: Sections[];
}

export interface Sections {
  id: number;
  name: string;
  description?: string | null;
  position: number;
  visible: number;
  images: Images[];
  items: Items[];
}

export interface Items {
  id: number;
  name: string;
  description?: string | null;
  alcoholic: number;
  price: number;
  position: number;
  visible: number;
  availabilityType: string;
  sku: string;
  modifiers?: Modifier[];
  images: Images[];
  available: boolean;
}

export interface Images {
  id: number;
  image: string;
}

export interface Modifier {
  id: number;
  name: string;
  minChoices: number;
  maxChoices: number;
  items: ItemMod[];
}

export interface ItemMod {
  id: number;
  name: string;
  price: number;
  maxChoices: number;
  position: number;
  visible: number;
  availabilityType: string;
  qty?: number;
  available: boolean;
}
