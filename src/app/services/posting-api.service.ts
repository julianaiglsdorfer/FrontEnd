import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Posting} from "../models/posting";

@Injectable({
  providedIn: 'root'
})
export class PostingApiService {

  constructor(private http: HttpClient) { }

  getPostings() {
    return this.http.get<Posting[]>('http://localhost:8082/postings');
  }

  getPostingsWithFilter(searchValue: string) {
    return this.http.get<Posting[]>('http://localhost:8082/postings/' + searchValue);
  }

  addPosting(posting: Posting) {
    this.http.put<Posting>('http://localhost:8082/addPosting', posting)
      .subscribe((response) => {

      });
  }
}
