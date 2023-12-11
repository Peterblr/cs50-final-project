import { Component, Input, OnInit } from '@angular/core';
import { ICategory, IProduct } from 'src/app/shared/models/product';
import { NavigationService } from 'src/app/shared/services/navigation.service';

@Component({
  selector: 'app-suggested-products',
  templateUrl: './suggested-products.component.html',
  styleUrls: ['./suggested-products.component.css']
})
export class SuggestedProductsComponent implements OnInit {
  @Input() category: ICategory = {
    id: 0,
    category: '',
    subCategory: '',
  }

  @Input() count: number = 3;
  products: IProduct[] = [];
  
  constructor(private navService: NavigationService) { }

  ngOnInit(): void {
    this.navService
      .getProducts(
        this.category.category,
        this.category.subCategory,
        this.count
        )
      .subscribe((res: any[]) => {
        for (let product of res) {
          this.products.push(product);
        }
      });
  }

}
