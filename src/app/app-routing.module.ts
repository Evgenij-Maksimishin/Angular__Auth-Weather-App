import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, LoginComponent, RegistrationComponent } from '@yevhenii.maksimishin/auth-lib';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: '', loadChildren: () => import('./weather-page/weather.module').then(m => m.WeatherModule)
  },
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },

]



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
