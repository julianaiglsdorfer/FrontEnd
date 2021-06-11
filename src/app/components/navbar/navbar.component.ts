import { Component, OnInit } from '@angular/core';
import {AuthentificationService} from "../../services/authentification.service";
import {User} from "../../models/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private router: Router,
    public authentificationService: AuthentificationService
  ) {
  }

  ngOnInit(): void {
  }

  logout() {
    this.authentificationService.logout();
    console.error('logout');
    this.router.navigate(['/login']);
  }

}
