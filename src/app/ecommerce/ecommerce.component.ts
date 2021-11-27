import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-ecommerce',
  templateUrl: './ecommerce.component.html',
  styleUrls: ['./ecommerce.component.css']
})
export class EcommerceComponent implements OnInit {

  constructor(private service:ProductService) { }

  ngOnInit() {

    this.service.getFilterProductList();
    if(localStorage.getItem('token')!=null)
    this.service.getUserProfile();

    if(this.service.signInStatus==true)
    {
      var payload=JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
      var userRole=payload.role;
      console.log(userRole)
      if(userRole=="Admin"){
        this.service.getOrders();
        this.service.hideAdminOptions=true;
        
      }
      console.log(this.service.hideAdminOptions);
    }
  }

}
