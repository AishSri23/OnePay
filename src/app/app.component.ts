import { Component } from '@angular/core';
import {TabLinks} from './tab.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[TabLinks]
})
export class AppComponent {
 // navLinks:any=[];
 constructor(public tablinks:TabLinks)
 {
   
 }
 navLinks=this.tablinks.navLinks;
  title = 'OnePay';
  


  
   
}
