import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@yevhenii.maksimishin/auth-lib';
import { WeatherPageComponent } from './weather/weather-page.component';

const routes: Routes = [
  { path: 'weather', component: WeatherPageComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WeatherRoutingModule { }
