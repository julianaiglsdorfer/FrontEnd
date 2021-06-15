import { Component, OnInit } from '@angular/core';
import {Posting} from "../../models/posting";
import {FormBuilder, Validators} from "@angular/forms";
import {PostingApiService} from "../../services/posting-api.service";
import {UserApiService} from "../../services/user-api.service";
import {AuthentificationService} from "../../services/authentification.service";
import {User} from "../../models/user";
import {Emoji, EmojiEvent} from "@ctrl/ngx-emoji-mart/ngx-emoji";
import { ToastrService } from 'ngx-toastr';
import {FollowerApiService} from "../../services/follower-api.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: User;
  postings: Posting[] = [];
  searchValue: string = '';
  toggled = false;

  postingForm = this.formBuilder.group({
    emotion: ['', Validators.required] as unknown as Emoji,
    content: ''
  });

  constructor(
    private postingApiService: PostingApiService,
    private userApiService: UserApiService,
    private formBuilder: FormBuilder,
    public authentificationService: AuthentificationService,
    private toastr: ToastrService,
    private followerApiService: FollowerApiService
  ) {
    this.currentUser = authentificationService.currentUserValue;
  }

  ngOnInit() {
    this.followerApiService.getFollowedUsers(this.currentUser.username);
    this.followerApiService.$followedNeo4jUsers.subscribe( u => this.postingApiService.getPostings());
    this.postingApiService.$postings.subscribe(allPostings => this.postings = allPostings);
  }

  handleSuccessfulResponse(response: Posting[]) {
    this.postings = response;
  }

  searchPostings($event: Event): void {
    if (this.searchValue ==='') {
      this.postingApiService.getPostings();
    } else {
      this.postingApiService.getPostingsWithFilter(this.searchValue).subscribe(
        response => this.handleSuccessfulResponse(response),
      );
    }
  }

  addPosting() {
    const newPosting: Posting = new Posting(
      '',
      this.currentUser.username,
      this.postingForm.value.content,
      this.postingForm.value.emotion,
      '');

    this.postingApiService.addPosting(newPosting);
    this.postingForm.reset();
    this.toastr.success('Post wurde erfolgreich abgesetzt!', 'Success');
  }

  toggleEmojiPicker() {
    this.toggled = !this.toggled;
  }

  addEmoji(selected: EmojiEvent) {
    const emoji = (selected.emoji as any).native;
    this.postingForm.patchValue({
      emotion: emoji
    });
    console.error(this.postingForm.value);
    this.toggleEmojiPicker();
  }
}
