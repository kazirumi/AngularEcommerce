import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductCRUDComponent } from './Ecommerce/product-crud/product-crud.component';
import { ProductComponent } from './Ecommerce/product/product.component';
import { ProductDetailComponent } from './ecommerce/product-crud/product-detail/product-detail.component';
import { EcommerceComponent } from './Ecommerce/ecommerce.component';
import { AddToCartComponent } from './Ecommerce/Product/add-to-cart/add-to-cart.component';
import { OrderComponent } from './ecommerce/order/order.component';

const routes: Routes = [
  {path:'Product',component:ProductComponent},
  {path:'ProductCRUD',component:ProductCRUDComponent },
  {path:'ProductDetail/:id',component:ProductDetailComponent },
  {path:'Order',component:OrderComponent},

  {path:'Ecommerce',component:EcommerceComponent },
  {path:'AddToCart',component:AddToCartComponent},

  {path:'',redirectTo:'Ecommerce',pathMatch:'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents=[ProductComponent,ProductCRUDComponent,ProductDetailComponent,EcommerceComponent,AddToCartComponent,OrderComponent]