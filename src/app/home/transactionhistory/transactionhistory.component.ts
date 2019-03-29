import { Component, OnInit } from '@angular/core';
import { TransactionDetails } from './transactionDetails.model';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { transactionService } from './transaction.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-transactionhistory',
  templateUrl: './transactionhistory.component.html',
  styleUrls: ['./transactionhistory.component.css']
})
export class TransactionhistoryComponent implements OnInit {


  transactionTypeDetails: FormArray;
  TransactionDetailsForm: FormGroup;
  transactionList: any;
  errorMessage: String;
  id: string;
  amountdue: number = 1234564;
  constructor(public dialog: MatDialog,    
    private formBuilder: FormBuilder,
    public transactionService: transactionService) { }


  transactiondetails: TransactionDetails[];
  ngOnInit() {

    this.id = sessionStorage.getItem('userID');
    this.transactionService.getTransactions(this.id).subscribe(
      data => {
        this.createForm(data);

      }
      ,
     (err: HttpErrorResponse) => {
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
  createForm(data: any) {
    this.transactiondetails = data;
    console.log(this.transactiondetails);
    this.transactionTypeDetails = this.formBuilder.array(
      this.transactiondetails.map(x => this.formBuilder.group({
        transactionid: [x.transactionId],
        TransactionStatus: [this.convertIdtoStatus(x.transactionStatusId)],
        accountnumber: [x.accountId]
      }))
    );

    

    this.TransactionDetailsForm = this.formBuilder.group(
      {
        details: this.transactionTypeDetails

      });

    this.transactionList = this.TransactionDetailsForm.controls.details.value;

  }

  convertIdtoStatus(statusId)
    {
       var status;
        switch(statusId){
          case 1 : status ='Successful';
                     break;
          case 2 : status ='Declined';
                     break;
          case 3 : status ='Waiting For Confirmation';
                     break;
          default : status = '';
        }
        return status;
    }
}
