import { Component, OnInit } from '@angular/core';
import {TransactionStatus} from './transactionstatus.model';
import {FormGroup,FormControl,Validators,FormBuilder,FormArray} from '@angular/forms';

@Component({
  selector: 'app-transactionhistory',
  templateUrl: './transactionhistory.component.html',
  styleUrls: ['./transactionhistory.component.css']
})
export class TransactionhistoryComponent implements OnInit {
  
  
  constructor(private formBuilder:FormBuilder) { 
    
  }
  transactiondetails:TransactionStatus[]=[
    {      accountname:"Home Loan",   accountstatus:"Success",      accountnumber:123456789    },
    {      accountname:"RD Loan",   accountstatus:"Declined",      accountnumber:123456780    },
    {      accountname:"Credit Loan",   accountstatus:"Success",      accountnumber:123456781    },
    ];
  transactionstatus=  this.formBuilder.array(
      this.transactiondetails.map(x => this.formBuilder.group({
        accountname: [x.accountname],
        accountstatus: [x.accountstatus],
        accountnumber:[x.accountnumber]
      }))
    );
    
    
    transactionForm=this.formBuilder.group(
      {
        status:this.transactionstatus
      });
    
 statuslist=this.transactionForm.controls.status.value;

  ngOnInit() {
  }

}
