import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WeatherComponent} from "./weather.component";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    WeatherComponent],
    imports: [
        CommonModule,
        FormsModule
    ]
})
export class WeatherModule { }
