import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {loginService} from './login.service';
import {Observable} from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[loginService]
})
export class LoginComponent implements OnInit {

  unamePattern = "^[0-9]{8}$";
  pwdPattern = "^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$";//x2z@dG1
  errorMessage: String;
  isError=false;
  isValidFormSubmitted = true;
  constructor(private router:Router,private loginservice:loginService) { }

  ngOnInit() {
    sessionStorage.clear();
  }
  loginForm = new FormGroup({
    userid: new FormControl('', [Validators.required,Validators.pattern(this.unamePattern), Validators.maxLength(8),Validators.minLength(8)]),
    password: new FormControl('', [Validators.maxLength(12),Validators.minLength(6)]) 
});

onSubmit()
{
 
  
  this.isValidFormSubmitted=false;
  if(this.loginForm.invalid)
  {
    
    return;
  }
  else
  {
   // this.isValidFormSubmitted=true;
    this.validateUser(this.loginForm.controls["userid"].value,this.loginForm.controls["password"].value);
    if(!this.isValidFormSubmitted)
    {       
  return;
    
    }
    
    
     
     
  }

  
}
validateUser(id:string,password:string)
{
  
  
    this.loginservice.authenticateUser({id: id,password:password})
        .subscribe( data =>{
           this.isValidFormSubmitted=true;
           if(data!=undefined)
           {
           sessionStorage.setItem('isLoggedin', 'true');
           sessionStorage.setItem('userID', this.loginForm.controls["userid"].value);
           sessionStorage.setItem('userName', data.username); 
           this.errorMessage="";
           this.isError=false;
            this.router.navigate(['/home']);
           }
            
         },
         (err: HttpErrorResponse) => {
           
          console.log('Login error occurred:', err);
           if (err.error instanceof Error) {
             //A client-side or network error occurred.				 
             console.log('An error occurred:', err.error.message);
           } else {
             //Backend returns unsuccessful response codes such as 404, 500 etc.				 
             console.log('Backend returned status code: ', err.status);
             console.log('Response body:', err.error);
           }

           this.errorMessage="Login failed";
           this.isError=true;
         }
        
      );
       
}
}
