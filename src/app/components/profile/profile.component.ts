import { Component, OnInit } from '@angular/core';
import {AuthentificationService} from "../../services/authentification.service";
import {UserApiService} from "../../services/user-api.service";
import {Observable} from "rxjs";
import {Neo4jUser} from "../../models/neo4jUser";
import {FollowerApiService} from "../../services/follower-api.service";
import {Posting} from "../../models/posting";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  followedUsers: Neo4jUser[] = [];

  constructor(public authentificationService: AuthentificationService,
              private userApiService: UserApiService,
              private followerApiService: FollowerApiService) {}

  ngOnInit() {
    this.followerApiService.getFollowedUsers(this.authentificationService.currentUserValue.username).subscribe(
      response => this.handleSuccessfulResponse(response),
    );
  }

  handleSuccessfulResponse(response: Neo4jUser[]) {
    this.followedUsers = response;
  }

  unfollowUser(targetUser: Neo4jUser) {
    console.error('unfollowing user ' + targetUser);
    if (this.followerApiService.removeFollowRelationship(targetUser, targetUser)) {
      this.followerApiService.getFollowedUsers(this.authentificationService.currentUserValue.username).subscribe(
        response => this.handleSuccessfulResponse(response),
      );
    }
  }

}
