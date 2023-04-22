import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@yevhenii.maksimishin/auth-lib';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {


  constructor(public auth: AuthenticationService) { }

  ngOnInit(): void {
    
  }

  logout() {
    this.auth.logout()
  }

}
