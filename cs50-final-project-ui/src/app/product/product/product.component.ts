import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/models/product';
import { UtilityService } from 'src/app/shared/services/utility.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() view: 'grid' | 'list' | 'currcartitem' | 'prevcartitem' = 'grid';

  @Input() product: IProduct = {
    id: 0,
    title: '',
    description: '',
    price: 0,
    quantity: 0,
    productCategory: {
      id: 1,
      category: '',
      subCategory: '',
    },
    offer: {
      id: 1,
      title: '',
      discount: 0,
    },
    imageName: '',
  }

  constructor(public utilityService: UtilityService) { }

  ngOnInit(): void {
  }

}
