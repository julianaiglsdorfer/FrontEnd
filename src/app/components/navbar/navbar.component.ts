import { Component, OnInit } from '@angular/core';
import {AuthentificationService} from "../../services/authentification.service";
import {User} from "../../models/user";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private router: Router,
    public authentificationService: AuthentificationService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
  }

  logout() {
    this.authentificationService.logout();
    this.toastr.info("Logout successful");
    this.router.navigate(['/login']);
  }

}
