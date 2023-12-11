import { IProduct } from "./product";
import { IUser } from "./user";

export interface ICartItem {
    id: number;
    product: IProduct;
}

export interface ICart {
    id: number;
    user: IUser;
    cartItems: ICartItem[];
    ordered: boolean;
    orderedOn: string;
}