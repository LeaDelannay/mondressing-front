import {Component, OnInit} from '@angular/core';
import {WeatherService} from "./weather.service";
import {WeatherPredictions} from "./weatherPredictions";

@Component({
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  private zipCode : string;
  private countryCode: string;
  private selectedZipCode : string;
  private weatherPredictions : WeatherPredictions;
  private dailyPredictions : any[];


  constructor(private weatherService : WeatherService) { }

  ngOnInit() {
    this.countryCode = "fr";
  }



  groupBy(list, fn) {
    var groups = {};
    for (var i = 0; i < list.length; i++) {
      var group = JSON.stringify(fn(list[i]));
      if (group in groups) {
        groups[group].push(list[i]);
      } else {
        groups[group] = [list[i]];
      }
    }
    return this.arrayFromObject(groups);
  }

   arrayFromObject(obj) {
    var arr = [];
    for (var i in obj) {
      arr.push(obj[i]);
    }
    return arr;
  }

  getPredictions(){
    this.selectedZipCode = this.zipCode;
    this.weatherService.getPredictions(this.zipCode,this.countryCode).subscribe(
        items =>{
          this.weatherPredictions = items;
          this.dailyPredictions = this.groupBy(this.weatherPredictions.list, function(item){
            return [item.dt_txt.slice(0,10)]
          });
          console.log(this.dailyPredictions);
        }
    );
  }

}
