import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import Swal from 'sweetalert2';

interface Noticia {
  titulo: string;
}

@Component({
  selector: 'app-autores',
  templateUrl: './autores.component.html',
  styleUrls: ['./autores.component.css']
})
export class AutoresComponent implements OnInit {
  userRole: string | null = null;
  noticias: Noticia[] = [
    { titulo: 'Noticia 1' },
    { titulo: 'Noticia 2' },
    { titulo: 'Noticia 3' },
  ];

  posts: Post[] = [];

  constructor(
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole();
    this.postService.getSelfPosts().subscribe(posts => {
      this.posts = posts;
    });
  }

  crearNuevaEntrada(): void {
    this.router.navigate(['entrada'], { relativeTo: this.route });
  }


  editarPost(id: string): void {
    this.router.navigate(['entrada'], { relativeTo: this.route, queryParams: { postId: id, entrada: "Post" } });
  }

  eliminarPost(id: string): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Estás a punto de eliminar el post.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.postService.deletePost(id).subscribe(() => {
          this.postService.getSelfPosts().subscribe(posts => {
            this.posts = posts;
          });
        });
      }
    });
  }




  /* ********************************************************** */

  editarNoticia(index: number): void {
    console.log('Editar noticia', index);
  }


  eliminarNoticia(index: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Estás a punto de eliminar esta noticia.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('Eliminar noticia', index);
        this.noticias.splice(index, 1);
      };
    });
  }
}