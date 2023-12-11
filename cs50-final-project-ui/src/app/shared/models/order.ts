import { ICart } from "./cart";
import { IPayment } from "./payment";
import { IUser } from "./user";

export interface IOrder {
    id: number;
    user: IUser;
    cart: ICart;
    payment: IPayment;
    createdAt: string;
}