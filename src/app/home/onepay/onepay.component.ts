import { Component, OnInit } from '@angular/core';
import { OnePayAccounts } from './onepayaccount.model';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { OnePayService } from './onepay.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';
import { AccountDetails } from  '../accountoverview/accountdetail.model';
import { accountService } from '../accountoverview/accountoverview.service';
import {OnePayPayment} from './onepaypayment.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-onepay',
  templateUrl: './onepay.component.html',
  styleUrls: ['./onepay.component.css'],
  providers:[OnePayService,accountService]
})
export class OnepayComponent implements OnInit {
  modify: number;
  buttonname = "Modify";
  accountdetails: OnePayAccounts[];
  baseaccountdetails: AccountDetails[];
  id:string;onepaydetails:FormArray;
  onepayForm:FormGroup;
  accountlist:any;
  paymentdetails:OnePayPayment[]=[];
  errorMessage: String;
  isError=false;
  amountdue: number = 0;
  constructor(private router:Router,private formBuilder: FormBuilder, private onepayService:OnePayService, private accountservice: accountService) {

  }
  ngOnInit() {
    this.id = sessionStorage.getItem('userID');
    //Getting all the accounts
    this.accountservice.getAccountDetails(this.id).subscribe(
      data => {
         this.baseaccountdetails = data ; 
        

      }
      ,
     (err: HttpErrorResponse) => {
      console.log("Getting all base account details error" +err);
       if (err.error instanceof Error) {
         //A client-side or network error occurred.				 
         console.log('An error occurred:', err.error.message);
       } else {
         //Backend returns unsuccessful response codes such as 404, 500 etc.				 
         console.log('Backend returned status code: ', err.status);
         console.log('Response body:', err.error);
       }
     }
      
    );

    //Getting all one pay  accounts
this.onepayService.getOnePayAccounts(this.id).subscribe(
  data=>{
    this.accountdetails=data;
    console.log("data"+data);
this.createForm(data);
  },
  
  (err: HttpErrorResponse) => {
    console.log("getOnePayAccounts error" +err);
    if (err.error instanceof Error) {
      //A client-side or network error occurred.				 
      console.log('An error occurred:', err.error.message);
    } else {
      //Backend returns unsuccessful response codes such as 404, 500 etc.				 
      console.log('Backend returned status code: ', err.status);
      console.log('Response body:', err.error);
    }
  }
  
);

//Getting total amount due
this.onepayService.getTotalAmountDue(this.id).subscribe(
  data=>{
    console.log(data);
     this.amountdue=data;},
  
     (err: HttpErrorResponse) => {
      console.log("getTotalAmountDue error" +err);
       if (err.error instanceof Error) {
         //A client-side or network error occurred.				 
         console.log('An error occurred:', err.error.message);
       } else {
         //Backend returns unsuccessful response codes such as 404, 500 etc.				 
         console.log('Backend returned status code: ', err.status);
         console.log('Response body:', err.error);
       }
     }
     
  
);


  }
  createForm(data:any)
  {
    
    console.log("Test"+this.baseaccountdetails);
    this.onepaydetails = this.formBuilder.array(
      this.accountdetails.map(x => this.formBuilder.group({
        accountname: [x.bproductName],
        accountamount: [x.monthlyCyclePayment],
        accountnumber: [x.paccountId]
      }))
    );
    this.onepayForm = this.formBuilder.group(
      {
        details: this.onepaydetails,
        account: new FormControl('', [Validators.required])
      });
     this.accountlist = this.onepayForm.controls.details.value;
  }
    

 
  onModify(index) {
    this.modify = index;
    this.errorMessage = "";
    this.isError = false;
    

  }
  onDone(index) {
    this.modify = -1;
    if(this.onepayForm.controls.account.value == "")
    {
      this.errorMessage = "Account must be selected";
      this.isError = true;
      return;}
    this.accountlist = this.onepayForm.controls.details.value;
    let paymentobj: OnePayPayment= new OnePayPayment();
    paymentobj.pAccountId=this.accountlist[index].accountnumber;
    paymentobj.transactionAmount=this.accountlist[index].accountamount;
    paymentobj.userId=this.id;
    paymentobj.accountId=this.onepayForm.controls.account.value;
    paymentobj.transactionType=1;
    paymentobj.transactionProviderType=3;
    this.paymentdetails.push(paymentobj);
    //Getting modified due
    this.onepayService.getModifiedDue(paymentobj).subscribe(
      data=>{
        
        
        this.amountdue=data;},
      
        (err: HttpErrorResponse) => {
          console.log("getModifiedDue error" +err);
          if (err.error instanceof Error) {
            //A client-side or network error occurred.				 
            console.log('An error occurred:', err.error.message);
          } else {
            //Backend returns unsuccessful response codes such as 404, 500 etc.
            			 
            console.log('Backend returned status code: ', err.status);
            console.log('Response body:', err.error);
            

          }
          this.errorMessage=err.error.message;
           this.isError=true;
        }
        
      
    );
  }

  payAmount()
  {
    if(this.onepayForm.controls.account.value == "")
    {
      this.errorMessage = "Account must be selected";
      this.isError = true;
      return;}
      this.paymentdetails = [];
    console.log(this.accountlist);
    let paymentobj: OnePayPayment= new OnePayPayment();
    this.accountlist.forEach(element => {
      console.log(element.accountnumber);
      paymentobj.pAccountId=element.accountnumber;
      paymentobj.transactionAmount=element.accountamount;
      paymentobj.userId=this.id;
      paymentobj.accountId=this.onepayForm.controls.account.value;
      paymentobj.transactionType=1;
      paymentobj.transactionProviderType=3;
      this.paymentdetails.push(paymentobj);
      
    });
    
this.onepayService.makeOnePayPayment(this.paymentdetails).subscribe(
  data=>{
    this.errorMessage = "Payment SuccessFull";
      this.isError = true;
     // this.router.navigate(['/transaction']);
    console.log(data);
     },
     (err: HttpErrorResponse) => {
       if (err.error instanceof Error) {
         //A client-side or network error occurred.				 
         console.log('An error occurred:', err.error.message);
       } else {
         //Backend returns unsuccessful response codes such as 404, 500 etc.				 
         console.log('Backend returned status code: ', err.status);
         console.log('Response body:', err.error);
       }
       this.errorMessage = err.error.message;
      this.isError = true;
     }
);
    //this.paymentdetails
  /*   {
      "userId": "string",
      "accountId": "string",
      "pAccountId": "string",
      "transactionAmount": 0,
      "transactionType": 0,
      "transactionProviderType": 0
    } */
  }
}
