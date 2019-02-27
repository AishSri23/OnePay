import { Component, OnInit } from '@angular/core';
import {OnePayAccounts} from './onepayaccount';
import {FormGroup,FormControl,Validators,FormBuilder,FormArray} from '@angular/forms';



@Component({
  selector: 'app-onepay',
  templateUrl: './onepay.component.html',
  styleUrls: ['./onepay.component.css']
})
export class OnepayComponent implements OnInit {
  modify=false;
  buttonname="Modify";
  //accountdetails:OnePayAccounts[]
 
  amountdue:number=1234564;
  constructor(private formBuilder:FormBuilder) { 
    
  }
  accountdetails:OnePayAccounts[]=[
    {      accountname:"Home Loan",   accountamount:987456311,      accountnumber:123456789    },
    {      accountname:"RD Loan",   accountamount:987456312,      accountnumber:123456780    },
    {      accountname:"Credit Loan",   accountamount:987456313,      accountnumber:123456781    },
    ];

  onepaydetails=  this.formBuilder.array(
      this.accountdetails.map(x => this.formBuilder.group({
        accountname: [x.accountname],
        accountamount: [x.accountamount],
        accountnumber:[x.accountnumber]
      }))
    );
    
    
    onepayForm=this.formBuilder.group(
      {
        details:this.onepaydetails
      });
    
 accountlist=this.onepayForm.controls.details.value;

  ngOnInit() {
    
    
  }
  onModify()
  {
    console.log(this.accountlist);
    console.log(this.onepayForm)
    if(!this.modify)
    {
    this.modify=true;
    this.buttonname="Done";
    }
    else{
      this.modify=false;
      this.buttonname="Modify";

    }
    this.accountlist=this.onepayForm.controls.details.value;
  }
}
