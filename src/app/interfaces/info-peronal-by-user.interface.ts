export interface InfoPeronalByUserInterface {
  msg:     string;
  user:    User;
  success: boolean;
}

export interface User {
  id:             number;
  name:           string;
  lastname:       string;
  email:          string;
  phone:          string;
  age:            number;
  address:        string;
  billingaddress: string;
  brands:         string;
  gender:         string;
}

