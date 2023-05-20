import { Component, OnInit } from '@angular/core';
import { SubredditModel } from '../subreddit-model';
import { SubredditService } from '../subreddit.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-subreddits',
  templateUrl: './list-subreddits.component.html',
  styleUrls: ['./list-subreddits.component.css'],
})
export class ListSubredditsComponent implements OnInit {
  subreddits: Array<SubredditModel> = [];
  constructor(
    private subredditService: SubredditService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.subredditService.getAllSubreddits().subscribe({
      next: (data) => {
        this.subreddits = data;
      },
      error: () => {
        this.toastr.error('Failed to load subreddits! Please try again');
      },
    });
  }
}
