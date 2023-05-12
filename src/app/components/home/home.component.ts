import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';

interface Article {
  title: string;
  summary: string;
  image: string;
  link: string;
}

interface Blogger {
  name: string;
  bio: string;
  avatar: string;
}

interface Blog {
  title: string;
  link: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: Post[] = [];
  randomPosts: Post[] = [];
  loader: boolean = true;

  topBloggers: Blogger[] = [
    {
      name: 'Juan Pérez',
      bio: 'Experto en desarrollo de software y entusiasta de la inteligencia artificial.',
      avatar: 'https://th.bing.com/th/id/OIG.wSadHN8WeyvYi0rN82MQ?pid=ImgGn'
    },
    {
      name: 'María García',
      bio: 'Apasionada por la ciberseguridad y la privacidad en línea.',
      avatar: 'https://th.bing.com/th/id/OIG.j6FJjvdUQbjRmJduQfkC?pid=ImgGn&w=1024&h=1024&rs=1'
    },
    {
      name: 'María García',
      bio: 'Apasionada por la ciberseguridad y la privacidad en línea.',
      avatar: 'https://th.bing.com/th/id/OIG.Qa8xT7QWpsmjiy3GLcr_?pid=ImgGn'
    },
  ];

  recommendedNews: Blog[] = [
    {
      title: 'TechCrunch',
      link: 'https://techcrunch.com/'
    },
    {
      title: 'The Verge',
      link: 'https://www.theverge.com/'
    },
    {
      title: 'The Verge',
      link: 'https://www.theverge.com/'
    }
  ];

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getPosts().subscribe(posts => {
      this.posts = posts;
      this.randomPosts = this.selectRandomPosts(3);
      this.loader = false;
    });
  }

  selectRandomPosts(count: number): Post[] {
    const shuffledPosts = this.posts.slice().sort(() => 0.5 - Math.random());
    return shuffledPosts.slice(0, count);
  }
}
