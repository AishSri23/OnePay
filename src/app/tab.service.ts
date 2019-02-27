import { Injectable } from "@angular/core";

@Injectable()
export class TabLinks
{
    navLinks=[];
    constructor() {
    this.navLinks=[ 
    
        { path:'overview',label:'Home'},
      /*  { path:'onepay',label:'One Pay'},
        { path:'transaction',label:'Transaction History'}, */
        { path:'/login',label:'Log Out'}
       ];
    }


       updateNavAfterAuth({path,text}): void {
         //  debugger;
          var pathlength=this.navLinks.filter(x=>x.path==path).length;
          if(pathlength==0)
          {
              if(path=="onepay")
                this.navLinks.splice(1,0,{ path:path,label:text});
            else
            this.navLinks.splice(2,0,{ path:path,label:text});
            }
           
           
       }
       getLinks() {
        return this.navLinks;
      }
}