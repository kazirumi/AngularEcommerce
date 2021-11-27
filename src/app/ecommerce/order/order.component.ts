import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from 'src/app/shared/product.model';
import { ProductService } from 'src/app/shared/product.service';
import { HttpClient,HttpEventType } from '@angular/common/http';
import { OrderDetails } from 'src/app/shared/order-details.model';

import { Router } from "@angular/router";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styles: []
})
export class OrderComponent implements OnInit {

orderdetail:OrderDetails={ID:0,ProductID:0,OrderID:0,Price:0,Quantity:0};
orderdetails:OrderDetails[]=[];
  constructor(private service:ProductService,private http:HttpClient,private router:Router) { }

  ngOnInit() {

    this.resetForm();
    for(let i=0;i<this.service.cartNumber;i++)
    {
      // let Price=this.service.cartProduct[i].price;
      // let quantity=this.service.cartProduct[i].Quantity;
      // let ProductId=this.service.cartProduct[i].Id;
      // this.orderdetail.ID=0;
      // this.orderdetail.ProductID=ProductId;
      // this.orderdetail.OrderID=0;
      // this.orderdetail.Price=Price;
      // this.orderdetail.Quantity=quantity;
      var object:OrderDetails={ID:0,ProductID:this.service.cartProduct[i].Id,OrderID:0,Price:this.service.cartProduct[i].price,Quantity:this.service.cartProduct[i].Quantity}
      
      this.orderdetails.push(object);
     


    }

    //Add UserDEtails In Order Form
    this.service.getUserProfile();
    
    if(this.service.userDetails!=null)
    {
      this.service.formDataOrder.Name = this.service.userDetails.UserName;
      this.service.formDataOrder.Email = this.service.userDetails.Email;


    }
  }

  resetForm(form?:NgForm){
    if(form!=null)
    form.resetForm();
 
    this.service.formDataOrder={
      ID:0,
      Name:null,
      Address:null,
      PhoneNumber:null,
      Email:null,
      OrderDetails:this.orderdetails,
      OrderDate:new Date(),
     
     
    }
  }

  displayPhoto(Image:any){
    return `https://localhost:44386/${Image}`;
  }

  onSubmit(form:NgForm){
    //console.log(form);
    this.service.createOrder().subscribe(
      res=>{
        console.log(form);
        this.resetForm(form);
        this.service.cartProduct=[];
        this.service.cartNumber=0;
        this.orderdetails=[];

        this.router.navigate(['/Ecommerce']);
      },
      err=>{
        console.log(err);
      }
      );
   //return this.http.post('https://localhost:44386/api/Orders',this.service.formDataOrder);
  }
}
