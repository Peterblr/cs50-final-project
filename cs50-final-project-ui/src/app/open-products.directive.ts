import { Directive, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ICategory } from './shared/models/product';

@Directive({
  selector: '[OpenProducts]'
})
export class OpenProductsDirective {
  @Input() category: ICategory = {
    id: 0,
    category: '',
    subCategory: '',
  }

  @HostListener('click') openProducts() {
    this.router.navigate(['/products'], {
      queryParams: {
        category: this.category.category,
        subCategory: this.category.subCategory,
      }
    })
  }

  constructor(private router: Router) { }

}
