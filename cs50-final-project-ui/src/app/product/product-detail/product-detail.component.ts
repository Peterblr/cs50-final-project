import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IProduct, IReview } from 'src/app/shared/models/product';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { UtilityService } from 'src/app/shared/services/utility.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  imageIndex: number = 1;
  product!: IProduct;
  reviewControl = new FormControl('');
  showError = false;
  reviewSaved = false;
  otherReviews: IReview[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private navService: NavigationService,
    public utilityService: UtilityService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      let id = params.id;
      this.navService.getProduct(id).subscribe((res: any) => {
        this.product = res;
        this.fetchAllReviews();
      });
    });
  }

  submitReview() {
    let review = this.reviewControl.value;

    if (review === '' || review === null) {
      this.showError = true;
      return;
    }

    let userId = this.utilityService.getUser().id;
    let productId = this.product.id;

    this.navService.submitReview(userId, productId, review).subscribe((res) => {
      this.reviewSaved = true;
      this.fetchAllReviews();
      this.reviewControl.setValue('');
    });
  }

  fetchAllReviews() {
    this.otherReviews = [];
    this.navService
      .getAllProductReviews(this.product.id)
      .subscribe((res: any) => {
        for (let review of res) {
          this.otherReviews.push(review);
        }
      });
  }
}
