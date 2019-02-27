import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  unamePattern = "^[0-9]{10}$";
  pwdPattern = "^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$";//x2z@dG1
  isValidFormSubmitted = true;
  constructor(private router:Router) { }

  ngOnInit() {
  }
  loginForm = new FormGroup({
    userid: new FormControl('', [Validators.required,Validators.pattern(this.unamePattern), Validators.maxLength(10),Validators.minLength(10)]),
    password: new FormControl('', [Validators.required,Validators.pattern(this.pwdPattern), Validators.maxLength(12),Validators.minLength(6)])
});

onSubmit()
{
  debugger;
  
  this.isValidFormSubmitted=false;
  if(this.loginForm.invalid)
  {
    
    return;
  }
  else
  {
    this.isValidFormSubmitted=true;
    localStorage.setItem('isLoggedin', 'true');
     
     this.router.navigate(['/']);
  }

  
}
}
