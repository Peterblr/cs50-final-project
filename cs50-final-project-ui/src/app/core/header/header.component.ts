import {
  Component,
  ElementRef,
  OnInit,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { LoginComponent } from 'src/app/client/login/login.component';
import { RegisterComponent } from 'src/app/client/register/register.component';
import { INavigationItem } from 'src/app/shared/models/navigation';
import { ICategory } from 'src/app/shared/models/product';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { UtilityService } from 'src/app/shared/services/utility.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('modalTitle') modalTitle!: ElementRef;
  @ViewChild('container', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;
  cartItems: number = 0;

  navList: INavigationItem[] = [];
  constructor(private navigationService: NavigationService,
    public utilityService: UtilityService) {}

  ngOnInit(): void {
    // Get Category List
    this.navigationService.getCategoryList().subscribe((list: ICategory[]) => {
      for (let item of list) {
        let present = false;
        for (let navItem of this.navList) {
          if (navItem.category === item.category) {
            navItem.subCategories.push(item.subCategory);
            present = true;
          }
        }
        if (!present) {
          this.navList.push({
            category: item.category,
            subCategories: [item.subCategory],
          });
        }
      }
    });

    // Cart
    if (this.utilityService.isLoggedIn()) {
      this.navigationService
        .getActiveCartOfUser(this.utilityService.getUser().id)
        .subscribe((res: any) => {
          if (parseInt(res) === 0 || isNaN(res)) {
            this.cartItems = 0;
          } else {
            this.cartItems += parseInt(res);
          }
        });
    }

    this.utilityService.changeCart.subscribe((res: any) => {
      if (parseInt(res) === 0 || isNaN(res)) {
        this.cartItems = 0;
      } else {
        this.cartItems += parseInt(res);
      }
    });
  }

  openModal(name: string) {
    this.container.clear();
    let componentType!: Type<any>;
    if (name === 'login') {
      componentType = LoginComponent;
      this.modalTitle.nativeElement.textContent = 'Enter Login Info';
    }
    if (name === 'register') {
      componentType = RegisterComponent;
      this.modalTitle.nativeElement.textContent = 'Enter Register Info';
    }
    this.container.createComponent(componentType);
  }
}
