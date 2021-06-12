import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user";
import {Neo4jUser} from "../../models/neo4jUser";
import {UserApiService} from "../../services/user-api.service";
import {FollowerApiService} from "../../services/follower-api.service";
import {BehaviorSubject} from "rxjs";
import {AuthentificationService} from "../../services/authentification.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: User[] = [];

  constructor(
    private userApiService: UserApiService,
    private followerApiService: FollowerApiService,
    private authentificationService: AuthentificationService
  ) {
  }

  ngOnInit(): void {
    this.userApiService.getAllUsersExceptLoggedIn();
    this.userApiService.$allUsers.subscribe(allUsers => this.users = allUsers);
  }

  followUser(targetUser: User) {

    const fromUser: Neo4jUser = this.authentificationService.currentNeo4jUserValue;
    const toUser: Neo4jUser = {
      id : null,
      username: targetUser.username
    };

    this.followerApiService.addFollowRelationship(fromUser, toUser);
  }

}
