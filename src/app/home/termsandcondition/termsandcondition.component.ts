import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormsModule, Validators,FormGroup,FormControl} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {TabLinks} from '../../tab.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-termsandcondition',
  templateUrl: './termsandcondition.component.html',
  styleUrls: ['./termsandcondition.component.css'],
  providers:[TabLinks]
})
export class TermsandconditionComponent implements OnInit {
  ischecked = true;
  constructor(public dialogRef: MatDialogRef<TermsandconditionComponent>,public tablinks:TabLinks,private router:Router) {}
 termsForm=new FormGroup(
   {
    checked:new FormControl(false,[Validators.required])
   }
 );
  ngOnInit() {
  }
  onClick()
  {
   
    this.dialogRef.close();
  }
  onContinueClick()
  {
    this.ischecked=false;
    if(this.termsForm.invalid)
    {     
      return;
    }
    else
    {
     // debugger;
      this.ischecked=true;
     
      //console.log(this.tablinks);
    
    this.dialogRef.close("Continue");
    
    
    }
  }
}
