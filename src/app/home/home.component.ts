import { Component, OnInit } from '@angular/core';
import {TabLinks} from '../tab.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[TabLinks]
})
export class HomeComponent implements OnInit {
  navLinks=[];
  loggedUser=" ";
  constructor(private router:Router,public tablinks:TabLinks)
  {
    
    
  }
  
  ngOnInit() {
    this.loggedUser = sessionStorage.getItem('userName');
    this.navLinks=this.tablinks.getLinks();
    
  }

}
