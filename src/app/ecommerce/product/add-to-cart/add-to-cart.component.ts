import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/product.model';
import { ProductService } from 'src/app/shared/product.service';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styles: []
})
export class AddToCartComponent implements OnInit {
  tempProduct:Product;
  PLaceOrder:boolean=false;
  public TotalPrice:number;

  constructor(private service:ProductService) {
    this.TotalPriceCount();
    if(this.service.cartNumber>0)
    this.PLaceOrder=true;
   }

  ngOnInit() {
    this.service.getProductList();
  }

  displayPhoto(Image:any){
    return `https://localhost:44386/${Image}`;
  }

  increaseQunatity(cart:Product){
    this.service.getProductList();
    this.tempProduct=this.service.productList.find(product=>product.Id==cart.Id);
    // console.log(this.tempProduct);
    let indexCart=this.service.cartProduct.findIndex((obj=>obj.Id==cart.Id));
    this.tempProduct.Quantity=cart.Quantity+this.tempProduct.Quantity;
    this.tempProduct.price=cart.price+this.tempProduct.price;
   
    this.service.cartProduct[indexCart]=this.tempProduct;
  
    
    this.TotalPriceCount();
    // let a:number=0;
    // function iterate (item:Product,index:number,array:Product[]){
    //   //console.log(item);
    //  if(a==0)
    //   a=array[index].price;

    //   this.TotalPrice=array[index].price+a;
      
    //   console.log( this.TotalPrice);
    // }
    
  }

  decreaseQunatity(cart:Product)
  {
    this.service.getProductList();
    this.tempProduct=this.service.productList.find(product=>product.Id==cart.Id);
    // console.log(this.tempProduct);
    let indexCart=this.service.cartProduct.findIndex((obj=>obj.Id==cart.Id));
    this.tempProduct.Quantity=cart.Quantity-this.tempProduct.Quantity;
    this.tempProduct.price=cart.price-this.tempProduct.price;
    if(this.tempProduct.Quantity>0)
    {
    this.service.cartProduct[indexCart]=this.tempProduct;
    this.TotalPriceCount();
    

    }
    else
    {
    this.service.cartProduct.splice(indexCart,1);
    this.TotalPriceCount();
    this.service.cartNumber= this.service.cartNumber-1;
    }
  }

  TotalPriceCount(){
    let total=0;
    for(let i=0;i<this.service.cartProduct.length;i++)
    {
      total=this.service.cartProduct[i].price+total;
    }

    this.TotalPrice=total;

    if(this.TotalPrice==0 )
    this.PLaceOrder=false;
  }
}
