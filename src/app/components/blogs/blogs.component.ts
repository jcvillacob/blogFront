import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post.model';
import { PostService } from '../../services/post.service';
import { UserService } from 'src/app/services/user.service';
import { Category } from 'src/app/models/category.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
  authors: User[] = [];
  categories: Category[] = [];
  posts: Post[] = [];
  filteredPosts: Post[] = [];
  searchTitle: string = '';
  selectedAuthor: string = '';
  selectedCategory: string = '';

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getPosts().subscribe(posts => {
      this.posts = posts;
      this.filteredPosts = posts;
    });
  }

  filterPosts(): void {
    this.filteredPosts = this.posts.filter(post => {
      const matchesTitle = post.title.toLowerCase().includes(this.searchTitle.toLowerCase());
      const matchesAuthor = !this.selectedAuthor || post.author._id === this.selectedAuthor;
      const matchesCategory = !this.selectedCategory || post.category._id === this.selectedCategory;
      return matchesTitle && matchesAuthor && matchesCategory;
    });
  }
}
