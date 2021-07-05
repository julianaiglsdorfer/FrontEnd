import {Component, OnInit} from '@angular/core';
import {AuthentificationService} from "../../services/authentification.service";
import {UserApiService} from "../../services/user-api.service";
import {Neo4jUser} from "../../models/neo4jUser";
import {FollowerApiService} from "../../services/follower-api.service";
import {User} from "../../models/user";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  followedUsers: Neo4jUser[] = [];
  currentUser: User;

  constructor(public authentificationService: AuthentificationService,
              private userApiService: UserApiService,
              private toastr: ToastrService,
              private followerApiService: FollowerApiService) {
    this.currentUser = this.authentificationService.currentUserValue;
  }

  ngOnInit() {
    this.followerApiService.getFollowedUsers(this.authentificationService.currentUserValue.username);
    this.followerApiService.$followedNeo4jUsers.subscribe(users => this.followedUsers = users);
  }

  handleSuccessfulResponse(response: Neo4jUser[]) {
    this.followedUsers = response;
  }

  unfollowUser(targetUser: Neo4jUser) {
    console.error('unfollowing user ' + targetUser);
    const sourceUser: Neo4jUser = this.authentificationService.currentNeo4jUserValue;
    this.followerApiService.removeFollowRelationship(sourceUser, targetUser);
    this.toastr.success('Unfollowed user ' + targetUser.username, 'Success');
  }

}
