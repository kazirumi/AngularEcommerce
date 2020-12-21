import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule,routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
//import { EcommerceComponent } from './ecommerce/ecommerce.component';
//import { ProductCRUDComponent } from './Ecommerce/product-crud/product-crud.component';
//import { ProductComponent } from './Ecommerce/product/product.component';
import { ProductService } from "./shared/product.service";
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddToCartComponent } from './Ecommerce/Product/add-to-cart/add-to-cart.component';
// import { ProductDetailComponent } from './ProductCRUD/product-detail/product-detail.component';
@NgModule({
  declarations: [
    AppComponent,
    
    routingComponents,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
