import { Component, OnInit } from '@angular/core';
import { ISuggestedProduct } from 'src/app/shared/models/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  suggestedProducts: ISuggestedProduct[] = [
    {
      banerImage: 'Baner/Baner_Mobile.jpg',
      category: {
        id: 0,
        category: 'electronics',
        subCategory: 'mobiles',
      },
    },
    {
      banerImage: 'Baner/Baner_Laptop.png',
      category: {
        id: 1,
        category: 'electronics',
        subCategory: 'laptops',
      },
    },
    {
      banerImage: 'Baner/Baner_Chair.png',
      category: {
        id: 2,
        category: 'furniture',
        subCategory: 'chairs',
      },
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
