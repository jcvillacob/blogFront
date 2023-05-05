import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post.model';
import { PostService } from '../../services/post.service';
import { UserService } from 'src/app/services/user.service';
import { Category } from 'src/app/models/category.model';
import { User } from 'src/app/models/user.model';
import { CategoryService } from 'src/app/services/category.service';

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

  constructor(
    private postService: PostService,
    private userService: UserService,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.postService.getPosts().subscribe(posts => {
      this.posts = posts;
      this.filteredPosts = posts;

      // Obteniendo autores asociados con los posts
      const authorIds = new Set(posts.map(post => post.author._id));
      this.userService.getUsers().subscribe(users => {
        this.authors = users.filter(user => authorIds.has(user._id));
      });

      // Obteniendo categorías asociadas con los posts
      const categoryIds = new Set(posts.map(post => post.category._id));
      this.categoryService.getCategories().subscribe(categories => {
        this.categories = categories.filter(category => categoryIds.has(category._id));
      });
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
