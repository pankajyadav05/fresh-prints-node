export interface ApparelUpdate {
  stockQuality: number;
  price: number;
}

export interface Stock extends ApparelUpdate {
  size: string;
  code: string;
}

export interface UserOrder {
  stockQuality: number;
  size: string;
  code: string;
}

export interface Apparel {
  code: string;
  name: string;
  sizes: Size[];
}

export interface Size {
  size: string;
  stockQuality: number;
  price: number;
}
