import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { TransactionhistoryComponent } from './transactionhistory.component';
import {CustomMaterialModule} from '../../material.module';
import {ReactiveFormsModule ,FormBuilder } from '@angular/forms';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';

describe('TransactionhistoryComponent', () => {
  let component: TransactionhistoryComponent;
  let fixture: ComponentFixture<TransactionhistoryComponent>;
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionhistoryComponent ],
      imports:[CustomMaterialModule,ReactiveFormsModule,HttpClientModule,BrowserAnimationsModule],
      providers:[HttpClientModule,HttpModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  function updateform()
  {
    component.TransactionDetailsForm = formBuilder.group(
      {
        details: null

      });
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
