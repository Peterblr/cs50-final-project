import { IUser } from "./user";

export interface IProduct {
    id: number;
    title: string;
    description: string;
    productCategory: ICategory;
    offer: IOffer;
    price: number;
    quantity: number;
    imageName: string;
}

export interface ICategory {
    id: number;
    category: string;
    subCategory: string;
}

export interface IOffer {
    id: number;
    title: string;
    discount: number;
}

export interface IReview {
    id: number;
    user: IUser;
    product: IProduct;
    value: string;
    createdAt: string;
}

export interface ISuggestedProduct {
    banerImage: string;
    category: ICategory;
}