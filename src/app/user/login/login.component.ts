import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/shared/product.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  formModel={
    UserName:'',
    Password:''
  }
  constructor(private service:ProductService,private router:Router,private toastr:ToastrService) { }

  ngOnInit(): void {

    if(localStorage.getItem('token')!=null)
    this.router.navigateByUrl('/Ecommerce');
    
  }



  onSubmit(form:NgForm){

    this.service.login(form.value).subscribe(
      (res:any)=>{
        localStorage.setItem('token',res.token);
        this.service.signInStatus=true;
        this.toastr.success('Logged in Successfully','Login Successful');
        this.router.navigateByUrl('/Ecommerce');
      },
      err=>{
        if(err.status ==400)
          this.toastr.error('Incorrect User Name or Password','Authentication');
        else
        console.log(err);
        
      }
    );

  }
  

}
