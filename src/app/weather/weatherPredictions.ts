import {WeatherPrediction} from "./weatherPrediction";

export interface WeatherPredictions {

    "cod": string,
    "message": number,
    "cnt": number,
    "list": WeatherPrediction[
        ],
    "city": {
        "id": number,
        "name": string,
        "coord": {
            "lat": number,
            "lon": number
        },
        "country": string,
        "population": number,
        "timezone": number
    }
}