import { Component, OnInit } from '@angular/core';
import {TabLinks} from '../tab.service';
import {Router} from '@angular/router';
import { OnepayComponent } from './onepay/onepay.component';
import { TransactionhistoryComponent } from './transactionhistory/transactionhistory.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[TabLinks]
})
export class HomeComponent implements OnInit {
  navLinks=[];
  loggedUser="Test";
  constructor(private router:Router,public tablinks:TabLinks)
  {
    /* var y=this.router.config.find(y=>y.path=='home');
    console.log(y);
    y.loadChildren()
    .push(
      { path: 'onepay', component:OnepayComponent },
      { path: 'transaction', component:TransactionhistoryComponent }
     
    ); */
    
  }
  
  ngOnInit() {
    this.navLinks=this.tablinks.getLinks();
    console.log(this.navLinks);
  }

}
