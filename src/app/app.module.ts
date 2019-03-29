import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {CustomMaterialModule} from './material.module';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import {AppRoutingModule} from './app-routing.module';
import { AuthGuard } from './shared/auth.guard';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
   
  ],
  providers: [AuthGuard],  
  bootstrap: [AppComponent]
})
export class AppModule { }
