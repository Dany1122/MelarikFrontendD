export interface UserInterface {
    id:             number;
    name:           string;
    lastname:       string;
    email:          string;
    password:       string;
    phone:          string;
    age:            number;
    address:        string;
    billingaddress: string;
    brands:         string;
    gender:         string;
    role_id:        number;
    active:         boolean;
    createdAt:      Date;
    updatedAt:      Date;
}