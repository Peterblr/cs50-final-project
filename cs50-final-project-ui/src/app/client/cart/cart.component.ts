import { Component, OnInit } from '@angular/core';
import { ICart } from 'src/app/shared/models/cart';
import { IPayment } from 'src/app/shared/models/payment';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { UtilityService } from 'src/app/shared/services/utility.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  userCart: ICart = {
    id: 0,
    user: this.utilityService.getUser(),
    cartItems: [],
    ordered: false,
    orderedOn: '',
  };

  userPaymentInfo: IPayment = {
    id: 0,
    user: this.utilityService.getUser(),
    paymentMethod: {
      id: 0,
      type: '',
      provider: '',
      available: false,
      reason: '',
    },
    totalAmount: 0,
    shipingCharges: 0,
    amountReduced: 0,
    amountPaid: 0,
    createdAt: '',
  };

  usersPreviousCarts: ICart[] = [];

  constructor(
    public utilityService: UtilityService,
    private navService: NavigationService
  ) {}

  ngOnInit(): void {
    //Get Cart
    this.navService
      .getActiveCartOfUser(this.utilityService.getUser().id)
      .subscribe((res: any) => {
        this.userCart = res;

        //calculate Payment
        this.utilityService.calculatePayment(
          this.userCart,
          this.userPaymentInfo
        );
      });

    // Get Previous Carts
    this.navService
      .getAllPreviousCarts(this.utilityService.getUser().id)
      .subscribe((res: any) => {
        this.usersPreviousCarts = res;
      });
  }
}
