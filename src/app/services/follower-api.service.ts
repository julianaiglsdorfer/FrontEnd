import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Neo4jUser} from "../models/neo4jUser";
import {HttpClient} from "@angular/common/http";
import {AuthentificationService} from "./authentification.service";

@Injectable({
  providedIn: 'root'
})
export class FollowerApiService {

  $followedNeo4jUsers: BehaviorSubject<Neo4jUser[]>;

  readonly URL_FOLLOWERSERVICE = 'http://localhost:8081/followservice';

  constructor(private httpClient: HttpClient) {
    this.$followedNeo4jUsers = new BehaviorSubject<Neo4jUser[]>([]);
  }

  getFollowers(user: string): Observable<Neo4jUser> {
    const list = this.httpClient.get<Neo4jUser>(this.URL_FOLLOWERSERVICE + '/getFollowers?user=' + user);
    return list;
  }

  getFollowedUsers(user: string): void {
    this.httpClient.get<Neo4jUser[]>(this.URL_FOLLOWERSERVICE + '/getFollowedUsers?user=' + user)
      .subscribe(followedUsers => this.$followedNeo4jUsers.next(followedUsers));
  }

  createNewUser(user: Neo4jUser): boolean {

    this.httpClient.put<Neo4jUser>(this.URL_FOLLOWERSERVICE + '/newUser', user).subscribe( (newUser) => console.error(newUser));
    // TODO check HTTP status
    return true;
  }

  addFollowRelationship(fromUser: Neo4jUser, toUser: Neo4jUser): boolean {

    const users: Neo4jUser[] = [fromUser, toUser];
    this.httpClient.post(this.URL_FOLLOWERSERVICE + '/addRelationship', users)
      .subscribe((response) => this.getFollowedUsers(fromUser.username));
    // TODO check HTTP status
    return true;
  }

  removeFollowRelationship(fromUser: Neo4jUser, toUser: Neo4jUser): boolean {

    const users: Neo4jUser[] = [fromUser, toUser];
    this.httpClient.post(this.URL_FOLLOWERSERVICE + '/removeRelationship', users)
      .subscribe((response) =>  this.getFollowedUsers(fromUser.username));
    // TODO check HTTP status
    return true;
  }
}
