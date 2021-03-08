import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/shared/product.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styles: [
  ]
})
export class RegistrationComponent implements OnInit {
  Check:boolean=null;
  constructor(private service:ProductService,private toastr:ToastrService) { }

  ngOnInit(): void {
  }
  CheckPassword(a){
    let b=this.service.userModel.get('Passwords.Password').value;
    if(a==b){
      this.Check=true;
    }
    else
    this.Check=false;
  }

  onSubmit(){
    this.service.CreateUser().subscribe(
      (res:any)=>{
        if(res.Succeeded){
          this.service.userModel.reset();
          this.toastr.success('new User created','Registration Successful');
        }
        else{
          res.Errors.forEach(element => {
            switch (element.code) {
              case 'DuplicateUserName':
                this.toastr.error('user name is taken','Registration Faild');
                break;
            
              default:
                this.toastr.error(element.Description,'Registration Faild');

                break;
            }
          });
        }
      },
      err=>{
        console.log(err);
      }
    );
  }

}
