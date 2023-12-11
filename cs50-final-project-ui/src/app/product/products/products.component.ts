import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/shared/models/product';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { UtilityService } from 'src/app/shared/services/utility.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  view: 'grid' | 'list' = 'list';
  sortby: 'default' | 'htl' | 'lth' = 'default';
  products: IProduct[] = [];

  constructor(
    private activateRouter: ActivatedRoute,
    private navService: NavigationService,
    private utilityService: UtilityService
  ) {}

  ngOnInit(): void {
    this.activateRouter.queryParams.subscribe((params: any) => {
      let category = params.category;
      let subCategory = params.subCategory;

      if (category && subCategory)
        this.navService
          .getProducts(category, subCategory, 10)
          .subscribe((res: any) => {
            this.products = res;
          });
    });
  }

  sortByPrice(sortKey: string) {
    this.products.sort((a, b) => {
      if (sortKey === 'default') {
        return a.id > b.id ? 1 : -1;
      }
      return (sortKey === 'htl' ? 1 : -1) *
        (this.utilityService.applyDiscount(a.price, a.offer.discount) >
        this.utilityService.applyDiscount(b.price, b.offer.discount)
          ? -1
          : 1);

      return 0;
    });
  }
}
