import { async, ComponentFixture, TestBed,inject } from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';
import { accountService } from './accountoverview.service';
import {AccountoverviewComponent} from './accountoverview.component';
import { HttpModule } from '@angular/http';
import {CustomMaterialModule} from '../../material.module';
import {ReactiveFormsModule ,FormBuilder } from '@angular/forms';


describe('AccountOverviewService', () => {


    beforeEach(async(() => 
    
    TestBed.configureTestingModule({
    declarations: [ AccountoverviewComponent ],  
      imports:[HttpClientModule,CustomMaterialModule,ReactiveFormsModule],             
      providers: [ accountService,HttpModule,HttpClientModule ],
    })
));




    it('should be created', () => {
        const service: accountService = TestBed.get(accountService);
        expect(service).toBeTruthy();
      });


     
    it('should get AccountDetails ', inject([accountService],(service:accountService) => {
        const  id : string="11223366";         
        expect(service.getAccountDetails(id)).toBeTruthy();
    }));

    
    it('should get Total AmountDue ', inject([accountService],(service:accountService) => {
        const  id : string="11223366";         
        expect(service.getTotalAmountDue(id)).toBeTruthy();
    }));


    it('should get is one pay registered ', inject([accountService],(service:accountService) => {
        const  id : string="11223366";         
        expect(service.getIsOnePayRegistered(id)).toBeTruthy();
    }));

});
/* 
    it('should register for one pay', inject([accountService],(service:accountService) => {
        const  id : string="11223366";     
          expect(service.registerForOnePay(id)).toBeTruthy();
      })); */