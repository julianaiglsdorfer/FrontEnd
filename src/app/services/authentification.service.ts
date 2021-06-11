import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../models/user";
import {HttpClient} from "@angular/common/http";
import {AlertService} from "./alert.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Neo4jUser} from "../models/neo4jUser";

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private returnUrl: any;

  constructor(private http: HttpClient,
              private alertService: AlertService,
              private router: Router,
              private route: ActivatedRoute) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(<string>localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public get currentNeo4jUserValue(): Neo4jUser {
    let x = new Neo4jUser();
    x.id = 0;
    x.email = this.currentUserValue.username;
    return x;
  }

  login(username: string, password: string) {
    const URL: string = "http://localhost:8083";
    const loginUser: User = new User();
    loginUser.setUsername = username;
    loginUser.setPassword = password;
    loginUser.setToken = 'fake-jwt-token';
    console.error(loginUser);
    this.http.post<User>(URL + '/validUser', loginUser)
      .toPromise()
      .then(
        (user) => {
          console.error('successful login');
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          this.router.navigate([this.returnUrl]);
        },
        (error) => {
          console.error('error while logging in')
          this.alertService.error(error);
        }
      );
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    // this.currentUserSubject.unsubscribe();

  }
}
