import {Component, Input, OnInit} from '@angular/core';
import {Posting} from "../../models/posting";

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent implements OnInit {
  @Input()
  posting: Posting;

  constructor() { }

  ngOnInit(): void {
  }

}
