import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import { HomeComponent } from './home.component';
import {CustomMaterialModule} from '../material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import {TabLinks} from '../tab.service';
import { By } from '@angular/platform-browser';

  describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;  


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports:[CustomMaterialModule,BrowserAnimationsModule,
      RouterTestingModule],
          providers:[TabLinks]
    })
    .compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
});
