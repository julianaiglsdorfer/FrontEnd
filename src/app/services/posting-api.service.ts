import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Posting} from "../models/posting";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostingApiService {
  $postings: BehaviorSubject<Posting[]>;

  constructor(private http: HttpClient) {
    this.$postings = new BehaviorSubject<Posting[]>([]);
  }

  getPostings(): void {
    this.http.get<Posting[]>('http://localhost:8082/postings')
      .subscribe(postings => this.$postings.next(postings));
  }

  getPostingsWithFilter(searchValue: string) {
    return this.http.get<Posting[]>('http://localhost:8082/postings/' + searchValue);
  }

  addPosting(posting: Posting) {
    this.http.put<Posting>('http://localhost:8082/addPosting', posting);
    this.getPostings();
  }

}
