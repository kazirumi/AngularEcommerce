import { OrderDetails } from "./order-details.model";

export class Order {
    ID:number;
    Name:string;
    Address:string;
    PhoneNumber:number;
    Email:string;
    OrderDetails:OrderDetails[]
}
