export interface ProductsInterface {
  msg:      string;
  products: Product[];
  success:  boolean;
}

export interface Product {
  id:           number;
  name_product: string;
  description:  string;
  price:        number;
  stock:        number;
  url_image:    string;
  category_id:  number;
  createdAt:    Date;
  updatedAt:    Date;
  quantity:     number;
}

