import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PostModel } from '../post/post-model';

@Component({
  selector: 'app-post-tile',
  templateUrl: './post-tile.component.html',
  styleUrls: ['./post-tile.component.css']
})
export class PostTileComponent {
  @Input() posts: PostModel[] = [];

  constructor(private router: Router) { }

  goToPost(id: number): void {
    this.router.navigateByUrl('/view-post/' + id);
  }
}
