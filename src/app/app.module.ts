import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AuthLibModule } from '@yevhenii.maksimishin/auth-lib';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WeatherService } from './services/weather.service';
import { WeatherPageComponent } from './weather-page/weather/weather-page.component';
import { WeatherLibModule } from '@yevhenii.maksimishin/weather-lib';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    WeatherPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    InMemoryWebApiModule,
    AuthLibModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    WeatherLibModule
  ],
  providers: [WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
