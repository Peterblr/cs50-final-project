import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ICategory } from '../models/product';
import { IUser } from '../models/user';
import { IPayment, IPaymentMethod } from '../models/payment';
import { IOrder } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  baseurl = "https://localhost:7134/api/Shopping/";

  constructor(private http: HttpClient) { }
  
  getCategoryList() {
    let url = this.baseurl + 'GetCategoryList';
    return this.http.get<any[]>(url).pipe(
      map((categories) => 
        categories.map((category) => {
          let mappedCategory: ICategory = {
            id: category.id,
            category: category.category,
            subCategory: category.subCategory,
          };
          return mappedCategory;
        })
      )
    );
  }

  getProducts(category: string, subCategory: string, count: number) {
    return this.http.get<any[]>(this.baseurl + 'GetProducts', {
      params: new HttpParams()
        .set('category', category)
        .set('subCategory', subCategory)
        .set('count', count),
    });
  }

  getProduct(id: number) {
    let url = this.baseurl + 'GetProduct/' + id;

    return this.http.get(url);
  }

  registerUser(user: IUser) {
    let url = this.baseurl + 'RegisterUser';

    return this.http.post(url, user, {responseType: 'text'});
  }

  loginUser(email: string, password: string) {
    let url = this.baseurl + 'LoginUser';
    return this.http.post(
      url,
      {Email: email, Password: password},
      {responseType: 'text'}
      );
  }

  submitReview(userId: number, productId: number, review: string) {
    let obj: any = {
      User: {
        Id: userId,
      },
      Product: {
        Id: productId,
      },
      Value: review,
    }

    let url = this.baseurl + 'InsertReview';

    return this.http.post(url, obj, {responseType: 'text'});
  }

  getAllProductReviews(productId: number) {
    let url = this.baseurl + 'GetProductReviews/' + productId;
    return this.http.get(url);
  }

  addToCart(userId: number, productId: number) {
    let url = this.baseurl + 'InsertCartItem/' + userId + '/' + productId;
    return this.http.post(url, null, {responseType: 'text'});
  }

  deleteFromCart(userId: number, productId: number) {
    let url = this.baseurl + 'DeleteCartItem/' + userId + '/' + productId;
    return this.http.delete(url);
  }

  getActiveCartOfUser(userId: number) {
    let url = this.baseurl + 'GetActiveCartOfUser/' + userId;
    return this.http.get<any>(url);
  }

  getAllPreviousCarts(userId: number) {
    let url = this.baseurl + 'GetAllPreviousCartOfUser/' + userId;
    return this.http.get(url);
  }

  getPaymentMethod() {
    let url = this.baseurl + 'GetPaymentMethod';
    return this.http.get<IPaymentMethod[]>(url);
  }

  insertPayment(payment: IPayment) {
    return this.http.post(this.baseurl + 'InsertPayment', payment, {responseType: 'text'});
  }

  insertOrder(order: IOrder) {
    return this.http.post(this.baseurl + 'InsertOrder', order);
  }
}
