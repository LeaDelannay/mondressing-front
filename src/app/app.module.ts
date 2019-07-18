import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { SharedModule } from './shared/shared.module';
import { ClothesModule } from './clothes/clothes.module';
import { HomepageComponent } from './home/homepage/homepage.component';
import { AccountModule } from './account/account.module';
import { WeatherModule } from './weather/weather.module';

@NgModule({
   declarations: [
      AppComponent,
      HomepageComponent
   ],
   imports: [
      BrowserModule,
      FormsModule, /* Formulaires */
      HttpClientModule, /* Pour se connecter au serveur */
      NgbModule,
      SharedModule,
      AccountModule,
      ReactiveFormsModule,
      ClothesModule,
      WeatherModule,
      AppRoutingModule /* Routes */
   ],
   providers: [],
   bootstrap: [AppComponent]
})
export class AppModule { }
