export interface ResponseHistoryInterface {
  msg:     string;
  orders:  Order[];
  success: boolean;
}

export interface Order {
  id:            number;
  user_id:       number;
  total_price:   number;
  status:        string;
  full_name:     string;
  address:       string;
  country:       string;
  phone_number:  string;
  createdAt:     Date;
  updatedAt:     Date;
  order_items:   OrderItem[];
  totalProducts: number;
}

export interface OrderItem {
  id:         number;
  order_id:   number;
  product_id: number;
  quantity:   number;
  price:      number;
  createdAt:  Date;
  updatedAt:  Date;
  producto:   Producto;
}

export interface Producto {
  id:           number;
  name_product: string;
  description:  string;
  price:        number;
  stock:        number;
  url_image:    string;
  category_id:  number;
  createdAt:    Date;
  updatedAt:    Date;
}

