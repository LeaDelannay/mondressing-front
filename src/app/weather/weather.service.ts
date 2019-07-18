import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {WeatherPredictions} from "./weatherPredictions";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {


  constructor(private http : HttpClient) { }

  getPredictions(zipCode:string, countryCode:string):  Observable<WeatherPredictions>{
      let baseUrl = 'http://api.openweathermap.org/data/2.5/forecast?zip='+zipCode+','+countryCode+'&appid=c468bad0b4922038728fba68acb38108&units=metric&lang=fr';
    return this.http.get<WeatherPredictions>(baseUrl, ).pipe(
        catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if(err.error instanceof ErrorEvent){
      errorMessage =`an error occurred: ${err.error.message}`;
    }else{
      errorMessage = `server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
