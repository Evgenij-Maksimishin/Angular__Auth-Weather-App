import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { chooseDayWeek, chooseNextPrevious, Weather } from '@yevhenii.maksimishin/weather-lib';
import { debounceTime, distinctUntilChanged, fromEvent, mergeMap, tap } from 'rxjs';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather-page',
  templateUrl: './weather-page.component.html',
  styleUrls: ['./weather-page.component.scss']
})
export class WeatherPageComponent implements OnInit, AfterViewInit {
  public weatherData!: Weather[];
  public weatherAllData!: Weather[];
  public loading = false;
  public cityName: string = 'Odessa'
  public disabledButton: chooseNextPrevious | null = null;

  @ViewChild('input') input!: ElementRef;

  constructor(private weather: WeatherService) { }


  ngOnInit(): void {
    this.weather.getWeatherByCity('Odessa').pipe(tap(() => this.loading = true)).subscribe(x => {
      this.weatherData = [x[0]];
      this.weatherAllData = x;
      this.loading = false;

    })

  }

  ngAfterViewInit(): void {
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(tap(() => this.loading = true), debounceTime(1000), distinctUntilChanged())
      .pipe(mergeMap((x: any) =>
        this.weather.getWeatherByCity(x.target.value)

      )).subscribe(x => {
        console.log(x[0]);
        this.weatherData = [x[0]];
        this.weatherAllData = x;
        this.loading = false
      })
  }

  onChange(day: chooseDayWeek | chooseNextPrevious): void {
    switch (day) {
      case 'next':
        this.findDay('next')
        break;
      case 'previous':
        this.findDay('previous')
        break;
      case 'day':
        this.weatherData = [this.weatherAllData[0]]
        break;

      default: this.weatherData = this.weatherAllData

    }
  }

  findDay(day: chooseNextPrevious): void {
    const count = day === 'next' ? 1 : -1;
    const isDayFound = this.weatherAllData.find(x => x.date.getDate() === this.weatherData[0].date.getDate() + count);

    if (isDayFound) {
      this.weatherData = [isDayFound]
      this.disabledButton = null
    }
    else {
      this.disabledButton = day;
    }

  }

}
