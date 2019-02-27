import {NgModule} from '@angular/core';
import {Routes, RouterModule} from  '@angular/router';

import { AccountoverviewComponent } from './accountoverview/accountoverview.component';
import { TermsandconditionComponent } from './termsandcondition/termsandcondition.component';

import { HomeComponent } from './home.component';
import { OnepayComponent } from './onepay/onepay.component';
import { TransactionhistoryComponent } from './transactionhistory/transactionhistory.component';
//import { LogoutComponent } from '../logout/logout.component';



  const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [          
            { path: '', component:AccountoverviewComponent },
            { path: 'overview', component:AccountoverviewComponent },
            { path: 'onepay', component:OnepayComponent },
            { path: 'transaction', component:TransactionhistoryComponent }
           
            
        ]
    }
];

  @NgModule({
      
          imports:[RouterModule.forChild(routes)],
          exports:[RouterModule]
          

      })
      export class HomeRoutingModule {}

  