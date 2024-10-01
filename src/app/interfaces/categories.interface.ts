export interface CategoriesInterface {
  msg:        string;
  categories: Category[];
  success:    boolean;
}

export interface Category {
  id:            number;
  name_category: string;
  createdAt:     Date;
  updatedAt:     Date;
}
