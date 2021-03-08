import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Order } from './order.model';
import { ProductType } from './product-type.model';
import { Product } from './product.model';
import { QuantityType } from './quantity-type.model';
import { SpecialTag } from './special-tag.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  formData:Product;
  formDataOrder:Order;

  productTypeList:ProductType[];
  specialTagList:SpecialTag[];
  quantityTypeList:QuantityType[];

  productList:Product[];
  filteredProduct:Product[];
  cartProduct:Product[]=[];

  cartNumber:number=0;

  readonly rootURL='https://localhost:44386/api';

  constructor(private http:HttpClient,private fb:FormBuilder) {
    this.filteredProduct=this.productList
   }

   userModel=this.fb.group({

    UserName:['',Validators.required],
    Email:['',Validators.email],
    FullName:[''],
    Passwords:this.fb.group({
      Password:['',[Validators.required,Validators.minLength(4)]],
      ConfirmPassword:['',Validators.required]
    })
   });

  //  comparePassword(fb:FormGroup){

  //   let confirmPswrdCtrl= fb.get('ConfirmPassword');
    
  //   if(confirmPswrdCtrl.errors==null)
  //   {
  //     if(fb.get('Password').value != confirmPswrdCtrl.value)
  //     {
  //       confirmPswrdCtrl.setErrors({passwordMismatch:true});
  //     }
  //     else
  //     {
  //       confirmPswrdCtrl.setErrors(null);
  //     }
  //   }

  //  }

  CreateUser(){
    var body={
      UserName:this.userModel.value.UserName,
      Email:this.userModel.value.Email,
      FullName:this.userModel.value.FullName,
      Password:this.userModel.value.Passwords.Password,

    };
   return this.http.post(this.rootURL+'/ApplicationUsers/Register',body);

  }
  createProduct(){
    return this.http.post(this.rootURL+'/Product',this.formData);
  }
  createOrder(){
    return this.http.post(this.rootURL+'/Orders',this.formDataOrder);
  }

  getProductList(){
    this.http.get(this.rootURL+'/Product')
    .toPromise()
    .then(res=>this.productList=res as Product[])
   
  }
  getFilterProductList(){
    this.http.get(this.rootURL+'/Product')
    .toPromise()
    .then(res=>this.filteredProduct=res as Product[])
  }

  getproductType(){
     this.http.get(this.rootURL+'/ProductType')
     .toPromise()
     .then(res=>this.productTypeList=res as ProductType[]);
  }
  

  
  getQuantityType(){
    this.http.get(this.rootURL+'/QuantityType')
    .toPromise()
    .then(res=>this.quantityTypeList=res as QuantityType[]);
 }

 getspecialTag(){
  this.http.get(this.rootURL+'/SpecialTag')
  .toPromise()
  .then(res=>this.specialTagList=res as SpecialTag[]);
}

}
