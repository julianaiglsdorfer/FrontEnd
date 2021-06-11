import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AlertService} from "./alert.service";
import {Router} from "@angular/router";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  constructor(private http: HttpClient,
              private alertService: AlertService,
              private router: Router) { }

  register(user: User) {
    this.httpPutRegisterUser(user);
  }

  httpPutRegisterUser(user: User) {
    const URL: string = "http://localhost:8083";

    this.http.put<User>(URL + '/newUser', user, {observe: 'response'})
      .toPromise()
      .then(
        (response) =>{
          console.error('successful registration');
          this.alertService.success('Registration successful', true);
          this.router.navigate(['/login']);
        },
        (error) =>{
          console.error('error registration');
          console.error(error);
          // TODO check for status?
          if (error.status === 403) {
            this.alertService.error('Username already taken');
          } else {
            this.alertService.error('Could not register user');
          }
        }
      );


  }
}
