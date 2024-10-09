export interface CartInterface {
  msg:     string;
  cart:    Cart;
  success: boolean;
}

export interface Cart {
  items:         Item[];
  totalProducts: number;
  totalPrice:    number;
}

export interface Item {
  sku:          number;
  nameProduct:  string;
  description:  string;
  price:        number;
  quantity:     number;
  img:          string;
  categoryName: string;
}
