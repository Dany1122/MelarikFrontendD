export interface CreateOrderInterface {
  userId:           number;
  full_name:        string;
  address:          string;
  country:          string;
  phone_number:     string;
  deliveryType:     string;
  coupon:           string;
  paymentMethod:    string;
  nameOnCard:       string;
  creditCardNumber: string;
  creditCardExpiry: string;
  creditCardCVV:    string;
  deliveryOption:   string;
}


export interface ResponseCreateOrderInterface {
  msg:     string;
  order:   Order;
  success: boolean;
}

export interface Order {
  id:                 number;
  user_id:            number;
  total_price:        number;
  status:             string;
  full_name:          string;
  address:            string;
  country:            string;
  phone_number:       string;
  delivery_type:      string;
  coupon:             string;
  payment_method:     string;
  credit_card_number: string;
  credit_card_expiry: string;
  credit_card_cvv:    string;
  delivery_option:    string;
  name_on_card:       string;
  updatedAt:          Date;
  createdAt:          Date;
}
