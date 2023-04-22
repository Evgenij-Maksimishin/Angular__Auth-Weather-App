import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Weather } from "@yevhenii.maksimishin/weather-lib";
import { map, mergeMap, Observable, of } from "rxjs";

@Injectable()

export class WeatherService {
    constructor(private http: HttpClient) { }

    getWeatherByCity(city: string): Observable<Weather[]> {
        if (!city) {
            return of();
        }
        const urlLocation = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=cb1a45b5bfca79667bde045a5f3082dd`

        const locationRequest = this.http.get<any>(urlLocation).pipe(
            map(x => (
                {
                    lat: x[0].lat,
                    lon: x[0].lon
                }
            )));

        return locationRequest.pipe(mergeMap(x => this.getWeatherByCoordinates(x)))

    }

    getWeatherByCoordinates(coordinates: { lat: number, lon: number }): Observable<Weather[]> {
        const locationUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=minutely,hourly&appid=cb1a45b5bfca79667bde045a5f3082dd`

        return this.http.get<any>(locationUrl).pipe(
            map(x => x.daily
                .map((y: any) => (
                    {
                        date: new Date(y.dt * 1000),
                        temperature: (y.temp.max - 273.15).toFixed(),
                        wind: y.wind_speed,
                        weatherType: y.weather?.[0].main,
                        humidity: y.humidity
                    }
                ))))
    }
}