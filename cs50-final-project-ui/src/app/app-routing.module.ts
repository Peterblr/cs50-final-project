import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { ProductsComponent } from './product/products/products.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { CartComponent } from './client/cart/cart.component';
import { OrderComponent } from './client/order/order.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},  
  {path: 'products', component: ProductsComponent},  
  {path: 'product-details', component: ProductDetailComponent},  
  {path: 'cart', component: CartComponent},  
  {path: 'orders', component: OrderComponent},  
  {path: '', redirectTo: '/home', pathMatch: 'full'},  
  {path: '**', component: PageNotFoundComponent},  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
