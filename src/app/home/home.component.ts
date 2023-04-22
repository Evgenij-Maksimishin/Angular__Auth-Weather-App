import { Component } from '@angular/core';
import { AuthenticationService } from '@yevhenii.maksimishin/auth-lib';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {


  constructor(public auth: AuthenticationService) { }

}
