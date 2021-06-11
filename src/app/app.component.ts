import { Component } from '@angular/core';
import {User} from "./models/user";
import {AuthentificationService} from "./services/authentification.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser: User | undefined;

  constructor(
    private authentificationService: AuthentificationService
  ) {
    this.authentificationService.currentUser.subscribe(x => this.currentUser = x);
  }
}
