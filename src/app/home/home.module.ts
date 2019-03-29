
import { NgModule } from '@angular/core';
import {CustomMaterialModule} from '../material.module';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



import { AccountoverviewComponent } from './accountoverview/accountoverview.component';
import { TermsandconditionComponent } from './termsandcondition/termsandcondition.component';


import {TabLinks} from '../tab.service';
import { OnepayComponent } from './onepay/onepay.component';
import { TransactionhistoryComponent } from './transactionhistory/transactionhistory.component';
import { HomeComponent } from './home.component';


import {HomeRoutingModule} from './home-routing.module';



@NgModule({
  declarations: [
    
    AccountoverviewComponent,
    TermsandconditionComponent,
    OnepayComponent,
    TransactionhistoryComponent,
    HomeComponent
    
    
  ],
  imports: [
    
    CustomMaterialModule,
    FormsModule,
    ReactiveFormsModule,    
    HomeRoutingModule,
    HttpClientModule
  ],
  entryComponents: [
    TermsandconditionComponent,
    OnepayComponent,
    TransactionhistoryComponent,
  ],
  providers: [ TabLinks],
  
})

export class HomeModule {}