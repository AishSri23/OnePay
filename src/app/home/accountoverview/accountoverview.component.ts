import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TermsandconditionComponent } from '../termsandcondition/termsandcondition.component';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { AccountDetails } from './accountdetail.model';
import { TabLinks } from '../../tab.service';
import { Observable } from 'rxjs';
import { accountService } from './accountoverview.service';
import {UserDetails} from '../../shared/userdetail.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-accountoverview',
  templateUrl: './accountoverview.component.html',
  styleUrls: ['./accountoverview.component.css'],
  providers: [accountService]
})
export class AccountoverviewComponent implements OnInit {


  accountTypeDetails: FormArray;
  accountoverviewForm: FormGroup;
  accountlist: any;
  errorMessage: String;
  isError=false;
  isRegistered = false;
  id: string;
  amountdue: number = 0;
  constructor(public dialog: MatDialog,
    public tablinks: TabLinks,
    private formBuilder: FormBuilder,
    public accountservice: accountService) { }
    userDetails:UserDetails;
  accountdetails: AccountDetails[];
  ngOnInit() {



    this.id = sessionStorage.getItem('userID');
    this.accountservice.getAccountDetails(this.id).subscribe(
      data => {
        // this.accountdetails = data   
        this.createForm(data);
        this.isError=false;
        this.errorMessage="";

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
        this.isError=true;
        this.errorMessage="An error occured please try again later";
      }
    );
    this.accountservice.getIsOnePayRegistered(this.id).subscribe(
      data =>{
        this.userDetails=data;
        this.isRegistered=this.userDetails.isRegisteredForOnePay;
        this.isError=false;
        this.errorMessage="";
        if(this.isRegistered)
          this.getAmountDue();
          
         
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
        this.isError=true;
        this.errorMessage="An error occured please try again later";
      }
    )

  }
  getAmountDue()
  {
//Getting total amount due
this.accountservice.getTotalAmountDue(this.id).subscribe(
  data=>{
    console.log(data);
     this.amountdue=data;
     this.tablinks.updateNavAfterAuth({ path: 'onepay', text: 'One Pay' });
        this.tablinks.updateNavAfterAuth({ path: 'transaction', text: 'Transaction History' });
    },
  
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
  createUser(data:any)
  {
    this.userDetails = data;
    //this.isRegistered = userdetails()
  }
  createForm(data: any) {
    this.accountdetails = data;
    
    console.log(this.accountdetails);

    this.accountTypeDetails = this.formBuilder.array(
      this.accountdetails.map(x => this.formBuilder.group({
        accountname: [x.accountName],
        accountnumber: [x.accountId],
        accountbalance: [x.accountBalance]
      }))
    );
    this.accountoverviewForm = this.formBuilder.group(
      {
        account: this.accountTypeDetails
      });
    this.accountlist = this.accountoverviewForm.controls.account.value;

  }


  openDialog(): void {
    const dialogRef = this.dialog.open(TermsandconditionComponent, {
      width: '450px',
      disableClose: true
    });


    dialogRef.afterClosed().subscribe(result => {
      if (result == "Continue") {
        
        this.accountservice.registerForOnePay(this.id).subscribe(
          data=>{
            console.log(data);
          this.isError=true;
        this.errorMessage=data;
        this.tablinks.updateNavAfterAuth({ path: 'onepay', text: 'One Pay' });
        this.tablinks.updateNavAfterAuth({ path: 'transaction', text: 'Transaction History' });
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
            this.isError=true;
            this.errorMessage="An error occured.Please try again later";
          }
        )
        
      }

      console.log('The dialog was closed' + result);

    });
  }









}
