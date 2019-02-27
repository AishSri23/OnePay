import {NgModule} from '@angular/core';
import {Routes,RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/auth.guard';


const routes:Routes=[
    { path:'login',component:LoginComponent  },
    { path:'',component:LoginComponent  },
    { path:'home',loadChildren: './home/home.module#HomeModule' ,canActivate: [AuthGuard] },
 
   
  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}