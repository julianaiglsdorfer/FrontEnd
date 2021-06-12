import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AlertService} from "./alert.service";
import {Router} from "@angular/router";
import {User} from "../models/user";
import {Neo4jUser} from "../models/neo4jUser";
import {AuthentificationService} from "./authentification.service";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  $allUsers: BehaviorSubject<User[]>;

  readonly URL_USERSERVICE = "http://localhost:8083";

  constructor(private http: HttpClient,
              private alertService: AlertService,
              private router: Router,
              private authentificationService: AuthentificationService) {
    this.$allUsers = new BehaviorSubject<User[]>([]);
  }

  register(user: User) {
    this.httpPutRegisterUser(user);
  }

  httpPutRegisterUser(user: User) {

    this.http.put<User>(this.URL_USERSERVICE + '/newUser', user, {observe: 'response'})
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

  getAllUsersExceptLoggedIn(): void {
    this.http.get<User[]>(this.URL_USERSERVICE + '/getUsers?loggedInUser=' + this.authentificationService.currentUserValue.username)
      .subscribe(users => this.$allUsers.next(users));
  }
}
