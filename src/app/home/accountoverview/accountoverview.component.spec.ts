import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AccountoverviewComponent } from './accountoverview.component';
import {CustomMaterialModule} from '../../material.module';
import {ReactiveFormsModule ,FormBuilder } from '@angular/forms';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { TabLinks } from '../../tab.service';

describe('AccountoverviewComponent', () => {
  let component: AccountoverviewComponent;
  let fixture: ComponentFixture<AccountoverviewComponent>;
  const formBuilder: FormBuilder = new FormBuilder();


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountoverviewComponent ],
      imports:[CustomMaterialModule,ReactiveFormsModule,HttpClientModule,BrowserAnimationsModule],
      providers:[HttpClientModule,HttpModule,TabLinks]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountoverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  function updateform()
  {
    component.accountoverviewForm = formBuilder.group(
      {
        details: null

      });
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
