import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RegisterComponent } from './register/register.component';

@NgModule({
   declarations: [LoginComponent, RegisterComponent],
   imports: [
      CommonModule,
      FormsModule,
      BrowserModule,
      ReactiveFormsModule
   ]
})
export class AccountModule { }
