import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';

interface Noticia {
  titulo: string;
}

@Component({
  selector: 'app-autores',
  templateUrl: './autores.component.html',
  styleUrls: ['./autores.component.css']
})
export class AutoresComponent implements OnInit {
  noticias: Noticia[] = [
    { titulo: 'Noticia 1' },
    { titulo: 'Noticia 2' },
    { titulo: 'Noticia 3' },
  ];

  posts: Post[] = [];

  constructor(
    private postService: PostService
  ) { }

  ngOnInit(): void {
    this.postService.getSelfPosts().subscribe(posts => {
      this.posts = posts;
    });
  }

  crearNuevaEntrada(): void {
    console.log('Crear nueva entrada');
  }

  editarNoticia(index: number): void {
    console.log('Editar noticia', index);
  }

  eliminarNoticia(index: number): void {
    console.log('Eliminar noticia', index);
    this.noticias.splice(index, 1);
  }

  editarPost(index: number): void {
    console.log('Editar post', index);
  }

  eliminarPost(index: number): void {
    console.log('Eliminar post', index);
    this.posts.splice(index, 1);
  }
}
