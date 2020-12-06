import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductCRUDComponent } from './Ecommerce/product-crud/product-crud.component';
import { ProductComponent } from './Ecommerce/product/product.component';

const routes: Routes = [
  {path:'Product',component:ProductComponent},
  {path:'ProductCRUD',component:ProductCRUDComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents=[ProductComponent,ProductCRUDComponent]