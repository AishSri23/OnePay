import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {TermsandconditionComponent} from '../termsandcondition/termsandcondition.component'
import {TabLinks} from '../../tab.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-accountoverview',
  templateUrl: './accountoverview.component.html',
  styleUrls: ['./accountoverview.component.css']
})
export class AccountoverviewComponent implements OnInit {

  isRegistered=false;
  savingnum:number=123456789;
  currentnum:number=987456311;
  savingamt:number=12456;
  currentamt:number=79463;
  amountdue:number=1234564;
  constructor(public dialog: MatDialog,public tablinks:TabLinks) { }

  ngOnInit() {
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(TermsandconditionComponent, {
      width: '450px' ,
      disableClose: true     
    });
   
    
    dialogRef.afterClosed().subscribe(result => {
      if(result=="Continue")
      {
   this.tablinks.updateNavAfterAuth({ path:'onepay',text:'One Pay'});
    this.tablinks.updateNavAfterAuth({ path:'transaction',text:'Transaction History'});
      }
    
      console.log('The dialog was closed'+result);
      
    });
  }
}
