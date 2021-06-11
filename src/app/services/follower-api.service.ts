import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Neo4jUser} from "../models/neo4jUser";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FollowerApiService {

  readonly URL_FOLLOWERSERVICE = 'http://localhost:8081/followservice';

  constructor(private httpClient: HttpClient) { }

  getFollowers(user: string): Observable<Neo4jUser> {
    const list = this.httpClient.get<Neo4jUser>(this.URL_FOLLOWERSERVICE + '/getFollowers?user=' + user);
    return list;
  }

  getFollowedUsers(user: string): Observable<Neo4jUser[]> {
    return this.httpClient.get<Neo4jUser[]>(this.URL_FOLLOWERSERVICE + '/getFollowedUsers?user=' + user);
  }

  createNewUser(user: Neo4jUser): boolean {
    console.error('creating new user');

    this.httpClient.put<Neo4jUser>(this.URL_FOLLOWERSERVICE + '/newUser', user).subscribe( (newUser) => console.error(newUser));
    // TODO check HTTP status
    return true;
  }

  addFollowRelationship(fromUser: Neo4jUser, toUser: Neo4jUser): boolean {
    console.error('adding relationship');

    const users: Neo4jUser[] = [fromUser, toUser];
    this.httpClient.post(this.URL_FOLLOWERSERVICE + '/addRelationship', users).subscribe((response) => console.error(response));
    // TODO check HTTP status
    return true;
  }

  removeFollowRelationship(fromUser: Neo4jUser, toUser: Neo4jUser): boolean {
    console.error('removing relationship');

    const users: Neo4jUser[] = [fromUser, toUser];
    this.httpClient.post(this.URL_FOLLOWERSERVICE + '/removeRelationship', users).subscribe((response) => console.error(response));
    // TODO check HTTP status
    return true;
  }
}
