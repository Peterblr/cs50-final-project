import { IUser } from "./user";

export interface IPaymentMethod {
    id: number;
    type: string;
    provider: string;
    available: boolean;
    reason: string;
}

export interface IPayment {
    id: number;
    user: IUser;
    paymentMethod: IPaymentMethod;
    totalAmount: number;
    shipingCharges: number;
    amountReduced: number;
    amountPaid: number;
    createdAt: string;
}
