import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {CustomMaterialModule} from '../material.module';
import { LoginComponent } from './login.component';
import {RouterTestingModule} from '@angular/router/testing';
import {loginService} from './login.service';
import {ReactiveFormsModule ,FormBuilder } from '@angular/forms';
import {of} from 'rxjs';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpModule } from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
 // create new instance of FormBuilder
 const formBuilder: FormBuilder = new FormBuilder();
let servicestub:any;
const routerSpy=jasmine.createSpyObj('Router', ['navigateByUrl']);
  beforeEach(async(() => {
    servicestub=
    {
getContent:()=>of({username:"Davis",userid:"11223366",userphonenumber:"123456789"}),
    };
   
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports:[CustomMaterialModule,ReactiveFormsModule,HttpClientModule,BrowserAnimationsModule,
      RouterTestingModule.withRoutes(
        [{
            path: 'login',
            component: LoginComponent
        }, ])],
        providers:[HttpClientModule,HttpModule,{ provide: Router, useValue: routerSpy },
          {provide:loginService,useValue:servicestub},
           { provide: FormBuilder, useValue: formBuilder }]
    })
    .compileComponents();
    
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  function updateForm() {

    component.loginForm = formBuilder.group({
      userid: null,
      password: null
  });
    
  }

  it('should create', () => {   
    updateForm();
    expect(component).toBeTruthy();
  });

  it('should validate the project fields', () => {
    updateForm();
        component.loginForm.controls['userid'].setValue('11223366');
       component.loginForm.controls['password'].setValue('password'); 
      
          
   expect(component.loginForm.valid).toBeTruthy();    
 });

 it('form should be invalid', () => {    
  
  component.loginForm.controls['userid'].setValue('11223366');
 component.loginForm.controls['password'].setValue('password');
expect(component.loginForm.invalid).toBeFalsy();    
});



it('Should set isValidFormSubmitted true on submit',()=>{
  updateForm();
  component.loginForm.controls['userid'].setValue('11223366');
  component.loginForm.controls['password'].setValue('password'); 
  component.onSubmit();

expect(component.isValidFormSubmitted).toBeFalsy();
});
});
