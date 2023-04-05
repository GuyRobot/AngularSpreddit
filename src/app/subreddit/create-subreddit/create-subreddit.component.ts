import { SubredditService } from './../subreddit.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SubredditModel } from '../subreddit-model';

@Component({
  selector: 'app-create-subreddit',
  templateUrl: './create-subreddit.component.html',
  styleUrls: ['./create-subreddit.component.css'],
})
export class CreateSubredditComponent {
  subredditForm: FormGroup;
  subredditModel: SubredditModel = {
    name: '',
    description: '',
  };

  constructor(
    private router: Router,
    private subredditService: SubredditService
  ) {
    this.subredditForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
  }

  create() {
    this.subredditModel.name = this.subredditForm.get('name')?.value || '';
    this.subredditModel.description =
      this.subredditForm.get('description')?.value || '';

    this.subredditService
      .createSubreddit(this.subredditModel)
      .subscribe({
        complete: () => this.router.navigateByUrl('/list-subreddits'),
        error: (error) => console.log('Error creating subreddit', error),
      });
  }

  discard() {
    this.router.navigateByUrl('/')
  }
}
