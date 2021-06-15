import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Posting} from "../models/posting";
import {BehaviorSubject} from "rxjs";
import {FollowerApiService} from "./follower-api.service";
import {AuthentificationService} from "./authentification.service";

@Injectable({
  providedIn: 'root'
})
export class PostingApiService {
  $postings: BehaviorSubject<Posting[]>;

  constructor(private http: HttpClient,
              private followerApiService: FollowerApiService,
              private authentificationService: AuthentificationService) {
    this.$postings = new BehaviorSubject<Posting[]>([]);
  }

  getPostings(): void {
    const URL = 'http://localhost:8082/postings?loggedInUser=' + this.authentificationService.currentUserValue.username;
    this.http.post<Posting[]>(URL, this.followerApiService.$followedNeo4jUsers.getValue())
      .subscribe(postings => this.$postings.next(postings));
  }

  getPostingsWithFilter(searchValue: string) {
    return this.http.get<Posting[]>('http://localhost:8082/postings/' + searchValue);
  }

  addPosting(posting: Posting) {
    this.http.put<Posting>('http://localhost:8082/addPosting', posting)
      .subscribe( post => this.getPostings());
  }

}
