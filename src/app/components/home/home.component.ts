import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

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
  featuredArticles: Article[] = [
    {
      title: 'La importancia de la inteligencia artificial',
      summary: 'La inteligencia artificial está revolucionando el mundo en el que vivimos...',
      image: 'https://th.bing.com/th/id/OIG.tgBhwJjDuIKmGWbhLG1f?pid=ImgGn',
      link: 'https://example.com/articles/ai'
    },
    {
      title: 'La evolución de los smartphones',
      summary: 'Los smartphones han cambiado la forma en que nos comunicamos...',
      image: 'https://th.bing.com/th/id/OIG.ceVkpq.qNgFTN02PJibY?pid=ImgGn',
      link: 'https://example.com/articles/smartphones'
    },
    {
      title: 'La evolución de los smartphones',
      summary: 'Los smartphones han cambiado la forma en que nos comunicamos...',
      image: 'https://th.bing.com/th/id/OIG.ceVkpq.qNgFTN02PJibY?pid=ImgGn',
      link: 'https://example.com/articles/smartphones'
    },
    {
      title: 'La evolución de los smartphones',
      summary: 'Los smartphones han cambiado la forma en que nos comunicamos...',
      image: 'https://th.bing.com/th/id/OIG.tgBhwJjDuIKmGWbhLG1f?pid=ImgGn',
      link: 'https://example.com/articles/smartphones'
    },
    {
      title: 'La evolución de los smartphones',
      summary: 'Los smartphones han cambiado la forma en que nos comunicamos...',
      image: 'https://th.bing.com/th/id/OIG.tgBhwJjDuIKmGWbhLG1f?pid=ImgGn',
      link: 'https://example.com/articles/smartphones'
    },
    {
      title: 'La evolución de los smartphones',
      summary: 'Los smartphones han cambiado la forma en que nos comunicamos...',
      image: 'https://th.bing.com/th/id/OIG.ceVkpq.qNgFTN02PJibY?pid=ImgGn',
      link: 'https://example.com/articles/smartphones'
    },
    // Más artículos destacados aquí
  ];

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

  recommendedBlogs: Blog[] = [
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
    },
    {
      title: 'The Verge',
      link: 'https://www.theverge.com/'
    },
    {
      title: 'The Verge',
      link: 'https://www.theverge.com/'
    },
    {
      title: 'The Verge',
      link: 'https://www.theverge.com/'
    },
    // Más blogs recomendados aquí
  ];

  constructor() { }

  ngOnInit(): void {
    console.log(localStorage.getItem("token"));
  }
}
