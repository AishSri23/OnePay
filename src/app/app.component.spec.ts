import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {RouterTestingModule} from '@angular/router/testing';
import { LoginComponent } from './login/login.component';
import {CustomMaterialModule} from './material.module';

/* describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,LoginComponent
      ],
      imports:[CustomMaterialModule,RouterTestingModule.withRoutes(
        [{
            path: 'login',
            component: LoginComponent
        }, 
        {
          path: '',
          component: LoginComponent
      },
      { path:'home',loadChildren: './home/home.module#HomeModule'}
    ])]
    }).compileComponents();
  })); */
 /*  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  })); */
/*   it(`should have as title 'OnePay'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('OnePay');
  }));

  
  
}); */
