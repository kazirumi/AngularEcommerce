import { HttpClient,HttpEventType } from '@angular/common/http';
import { Component, ErrorHandler, OnInit, } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ProductService } from 'src/app/shared/product.service';
import { isNullOrUndefined, isUndefined } from 'util';

@Component({
  selector: 'app-product-crud',
  templateUrl: './product-crud.component.html',
  styles: []
})
export class ProductCRUDComponent implements OnInit {
imgUrl:string="/assets/img/upload.png";
fileToUpload:File=null;
public progress: number;
  public message: string;
  public photoPath:{dbPath:null}
         
  hasEditPhoto:boolean=false;

  constructor(private service:ProductService,private http:HttpClient) { }


  ngOnInit() {
    if(isNullOrUndefined(this.service.formData))
    {
      this.resetForm();
      this.hasEditPhoto=false;
    }
    else
    this.hasEditPhoto=true;

    this.service.getproductType();
    this.service.getQuantityType();
    this.service.getspecialTag();

    this.service.getProductList();

  }
  resetForm(form?:NgForm){
    if(form!=null)
    form.resetForm();

    this.service.formData={
      Id:0,
      Name:"",
      price:0,
      Quantity:0,
      QuantityTypeID:0,
      Description:"",
      Image:"/assets/img/upload.png",
      IsAvailable:false,
      ProductColor:"",
      ProductTypeId:0,
      SpecialTagId: 0
    }
    this.fileToUpload=null;
    this.message="";
    this.progress=null;


  }

  handleFileInput(file:FileList){
    this.fileToUpload=file.item(0);

    var reader= new FileReader();
    reader.onload=(event:any)=>{
      this.service.formData.Image=event.target.result;

    }
    reader.readAsDataURL(this.fileToUpload);


   }



  public uploadConfirm=(files)=>{
    // let fileToUpload = <File>files[0];
    const Data= new FormData();
    Data.append('file',this.fileToUpload,this.fileToUpload.name);
    this.http.post('https://localhost:44386/api/', Data, {reportProgress: true, observe: 'events'})
    .subscribe(event => {
      if (event.type === HttpEventType.UploadProgress)
        this.progress = Math.round(100 * event.loaded / event.total);
      else if (event.type === HttpEventType.Response) {
        this.message = 'Upload success.';

        console.log(event);
        // this.SetImagepath(event.body);
      }
    });
  }


  onSubmit(form:NgForm){
    if(this.service.formData.Id == 0){
      this.createProduct(form);
    }else{
      this.updateProduct(form);
    }
    


  }

public SetImagepath=(event:any)=>{

this.photoPath=event;
this.service.formData.Image=this.photoPath.dbPath;
}


createProduct(form:NgForm){

  console.log(form);
  const formData= new FormData();
  formData.append('file',this.fileToUpload,this.fileToUpload.name)
  this.http.post('https://localhost:44386/api/Fileupload/Upload',formData,{reportProgress:true, observe:'events'})
  .subscribe(event=>{
    if(event.type===HttpEventType.UploadProgress)
    this.progress=Math.round(100 * event.loaded/ event.total)
    else if(event.type===HttpEventType.Response)
    { this.message='Upload successful';

     this.SetImagepath(event.body);

     this.service.createProduct()
     .subscribe
     (
        res=>{ this.resetForm(form)},
        err=>{console.log(err)}


      );
    }

  });
}



updateProduct(form:NgForm){
  console.log(form.value);
  if(this.fileToUpload!=null){
    const formData =new FormData();
    formData.append('file',this.fileToUpload,this.fileToUpload.name)
    this.http.post('https://localhost:44386/api/Fileupload/Upload',formData,{reportProgress:true, observe:'events'})
    .subscribe(event=>{
      if(event.type===HttpEventType.UploadProgress)
      this.progress=Math.round(100 * event.loaded/ event.total)
      else if(event.type===HttpEventType.Response)
      { this.message='Updated successful';
  
       this.SetImagepath(event.body);
  
       this.service.updateProduct()
       .subscribe
       (
          res=>{ this.resetForm(form)},
          err=>{console.log(err)}
  
  
        );
      }
  
    });
  }
  else{
    this.service.updateProduct()
    .subscribe
       (
          res=>{ this.resetForm(form)},
          err=>{console.log(err)}
  
  
        );
  }

  
}




public getImage=(Image:string)=>{

  return `https://localhost:44386/${Image}`;
}




}
