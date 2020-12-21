import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Product } from 'src/app/shared/product.model';
import { ProductService } from 'src/app/shared/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styles: []
})
export class ProductDetailComponent implements OnInit {
   productDetail:Product
  constructor(private route:ActivatedRoute,private service:ProductService) { }

  ngOnInit() {
    let Id =parseInt(this.route.snapshot.paramMap.get('id'));
    this.findProductDetail(Id);
  }

  findProductDetail(Id){
    if(Id!=null)
      this.productDetail=this.service.productList.find(product=>product.Id==Id);
  }

  saveCart(productDetail){
    console.log(productDetail);
    if(!this.service.cartProduct.find(product=>product.Id==productDetail.Id))
    this.service.cartProduct.push(productDetail );
    this.service.cartNumber=this.service.cartProduct.length;
    
    
  }

  displayPhoto(Image:any){
    return `https://localhost:44386/${Image}`;
  }

}
