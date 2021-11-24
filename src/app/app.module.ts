import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule,routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
//import { EcommerceComponent } from './ecommerce/ecommerce.component';
//import { ProductCRUDComponent } from './Ecommerce/product-crud/product-crud.component';
//import { ProductComponent } from './Ecommerce/product/product.component';
import { ProductService } from "./shared/product.service";
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MainNavComponent } from './main-nav/main-nav.component';
//import { AddToCartComponent } from './Ecommerce/Product/add-to-cart/add-to-cart.component';
//import { OrderComponent } from './ecommerce/order/order.component';
// import { ProductDetailComponent } from './ProductCRUD/product-detail/product-detail.component';
import {MatInputModule} from '@angular/material/input';
import {MatExpansionModule} from '@angular/material/expansion';
//import { UserComponent } from './user/user.component';
//import { RegistrationComponent } from './user/registration/registration.component';
import { ReactiveFormsModule } from "@angular/forms";

//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptor } from './auth/auth.interceptor';
import { DataTableComponent } from './data-table/data-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
//import { ProductListAdminComponent } from './ecommerce/product-crud/product-list-admin/product-list-admin.component';
// import { LoginComponent } from './user/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    
    routingComponents,
    
    MainNavComponent,
    
    DataTableComponent,
    
    //ProductListAdminComponent,
    
    // LoginComponent,
    
    //UserComponent,
    
    //RegistrationComponent,
    
   
    
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatExpansionModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      progressBar:true
    }),
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [ProductService,{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
