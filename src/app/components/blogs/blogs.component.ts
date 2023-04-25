import { Component, OnInit } from '@angular/core';

interface Post {
  id: string;
  title: string;
  content: string;
  author: Author;
  createdAt: Date;
  updatedAt: Date;
  category: Category;
  tags: string[];
}

interface Author {
  id: string;
  name: string;
}

interface Category {
  id: string;
  name: string;
}

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
  authors: Author[] = [
    { id: '1', name: 'Ana María Arango' },
    { id: '2', name: 'Juan Pérez' },
    { id: '3', name: 'Paulina Abascal' },
    { id: '4', name: 'Marcela Solórzano' },
  ];

  categories: Category[] = [
    { id: '1', name: 'Negocios' },
    { id: '2', name: 'Salud' },
    { id: '3', name: 'Cocina' },
    { id: '4', name: 'Finanzas' },
  ];

  posts: Post[] = [
    {
      id: '1',
      title: 'El emprendimiento en la era digital',
      content: 'Contenido del post 1...',
      author: { id: '1', name: 'Ana María Arango' },
      createdAt: new Date('2022-11-01T14:35:00'),
      updatedAt: new Date('2022-11-01T14:35:00'),
      category: { id: '1', name: 'Negocios' },
      tags: ['emprendimiento', 'digital', 'tecnología'],
    },
    {
      id: '2',
      title: 'Los beneficios de la meditación para la salud',
      content: 'Contenido del post 2...',
      author: { id: '2', name: 'Juan Pérez' },
      createdAt: new Date('2022-12-15T10:20:00'),
      updatedAt: new Date('2022-12-15T10:20:00'),
      category: { id: '2', name: 'Salud' },
      tags: ['meditación', 'relajación', 'bienestar'],
    },
    {
      id: '3',
      title: 'Aprende a cocinar como un profesional',
      content: 'Contenido del post 3...',
      author: { id: '3', name: 'Paulina Abascal' },
      createdAt: new Date('2023-01-10T16:45:00'),
      updatedAt: new Date('2023-01-10T16:45:00'),
      category: { id: '3', name: 'Cocina' },
      tags: ['recetas', 'chef', 'gastronomía'],
    },
    {
      id: '4',
      title: 'Cómo elegir el mejor seguro de auto',
      content: 'Contenido del post 4...',
      author: { id: '4', name: 'Marcela Solórzano' },
      createdAt: new Date('2023-02-08T08:15:00'),
      updatedAt: new Date('2023-02-08T08:15:00'),
      category: { id: '4', name: 'Finanzas' },
      tags: ['seguro de auto', 'protección', 'vehículos'],
    },
  ];
  searchTitle: string = '';
  selectedAuthor: string = '';
  selectedCategory: string = '';
  filteredPosts: Post[] = [];

  constructor() { }

  ngOnInit(): void {
    this.filteredPosts = this.posts;
  }

  filterPosts(): void {
    this.filteredPosts = this.posts.filter(post => {
      const matchesTitle = post.title.toLowerCase().includes(this.searchTitle.toLowerCase());
      const matchesAuthor = !this.selectedAuthor || post.author.id === this.selectedAuthor;
      const matchesCategory = !this.selectedCategory || post.category.id === this.selectedCategory;
      return matchesTitle && matchesAuthor && matchesCategory;
    });
  }
}
