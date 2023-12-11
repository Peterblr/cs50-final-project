import { Injectable } from '@angular/core';
import { IUser } from '../models/user';
import { NavigationService } from './navigation.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IProduct } from '../models/product';
import { Subject } from 'rxjs';
import { ICart } from '../models/cart';
import { IPayment } from '../models/payment';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  changeCart = new Subject();
  
  constructor(private jwt: JwtHelperService,
    private navService: NavigationService) { }

  applyDiscount(price: number, discount: number): number {
    let finalPrice: number = Math.floor(price - price * (discount / 100));

    return finalPrice;
  }

  // JWT Helper Service : npm i @auth0/angular-jwt

  getUser(): IUser {
    let token = this.jwt.decodeToken();
    let user: IUser = {
      id: token.id,
      firstName: token.firstName,
      lastName: token.lastName,
      address: token.address,
      mobile: token.mobile,
      email: token.email,
      password: '',
      createdAt: token.createdAt,
      modifiedAt: token.modifiedAt,
    };
    return user;
  }

  setUser(token: string) {
    localStorage.setItem('user', token);
  }

  isLoggedIn() {
    return localStorage.getItem('user') ? true : false;
  }

  logoutUser() {
    localStorage.removeItem('user');
  }

  addToCart(product: IProduct) {
    let productId = product.id;
    let userId = this.getUser().id;

    this.navService.addToCart(userId, productId).subscribe((res) => {
      if (res.toString() === 'inserted')
        {
          this.changeCart.next(1);
        }
    })
  }

  removeFromCart(product: IProduct) {
    let productId = product.id;
    let userId = this.getUser().id;

    this.navService.deleteFromCart(userId, productId).subscribe();
    window.location.reload();
  }

  calculatePayment(cart: ICart, payment: IPayment) {
    payment.totalAmount = 0;
    payment.amountPaid = 0;
    payment.amountReduced = 0;

    for (let cartItem of cart.cartItems) {
      payment.totalAmount += cartItem.product.price;

      payment.amountReduced += cartItem.product.price - this.applyDiscount(
        cartItem.product.price, cartItem.product.offer.discount
      );

      payment.amountPaid += this.applyDiscount(
        cartItem.product.price,
        cartItem.product.offer.discount
      );
    }

    payment.shipingCharges = Math.floor(payment.amountPaid * 0.1);
  }

  calculatePricePaid(cart: ICart) {
    let pricePaid = 0;
    for (let cartItem of cart.cartItems) {
      pricePaid += this.applyDiscount(cartItem.product.price, cartItem.product.offer.discount);
    }
    return pricePaid;
  }
}
