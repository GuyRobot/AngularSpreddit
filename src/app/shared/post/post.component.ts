import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { PostModel } from './post-model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PostComponent {
  @Input() posts: PostModel[] = [];
  constructor(private router: Router) {}
  goToPost(id: number): void {
    this.router.navigateByUrl('/view-post/' + id);
  }
}
