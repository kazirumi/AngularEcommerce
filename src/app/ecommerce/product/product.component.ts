import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/product.service';
import { Router } from "@angular/router";
import { Product } from 'src/app/shared/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styles: []
})
export class ProductComponent implements OnInit {
  productDetail:Product;
 

  constructor(private service:ProductService,private router:Router) { 
    
  
  }

  ngOnInit() {
    this.service.getProductList();
   
    
  }

 onSelect(prod:Product)
 {
    this.router.navigate(['/ProductDetail',prod.Id]);
 }

 findProductDetail(Id){
   
  if(Id!=null)
    this.productDetail=this.service.productList.find(product=>product.Id==Id);
    console.log(this.productDetail);
    this.saveCart(this.productDetail);
}

saveCart(productDetail){
  
  if(!this.service.cartProduct.find(product=>product.Id==productDetail.Id))
  this.service.cartProduct.push(productDetail );
  this.service.cartNumber=this.service.cartProduct.length;

 
  

  
}

public getImage=(Image:string)=>{

  return `https://localhost:44386/${Image}`; 
}


}

