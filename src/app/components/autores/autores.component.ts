import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { Post } from 'src/app/models/post.model';
import { User, UserRole } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
declare const bootstrap: any;

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
  UserRole = UserRole;
  loader: boolean = true;
  categorias: Category[] = [];
  posts: Post[] = [];
  usuarios: User[] = [];
  noticias: Noticia[] = [
    { titulo: 'Noticia 1' },
    { titulo: 'Noticia 2' },
    { titulo: 'Noticia 3' },
  ];

  nuevoUsuario: { name: string; email: string; password: string; role: UserRole, verified: boolean } = {
    name: '',
    email: '',
    password: '',
    role: UserRole.Commenter,
    verified: true,
  };

  usuarioEditado: { id: string; name: string; email: string; password: string; role: UserRole; verified: boolean } = {
    id: '',
    name: '',
    email: '',
    password: '',
    role: UserRole.Commenter,
    verified: false,
  };




  @ViewChild('usuarioForm') usuarioForm!: ElementRef;

  constructor(
    private postService: PostService,
    private categoryService: CategoryService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole();
    this.postService.getSelfPosts().subscribe(posts => {
      this.posts = posts;
      this.userService.getUsers().subscribe(usuarios => {
        this.usuarios = usuarios;
      })
      this.categoryService.getCategories().subscribe(categorias => {
        this.categorias = categorias;
      });
      this.loader = false;
    });
  }

  /* Funció para Nueva Entrada */
  crearNuevaEntrada(): void {
    this.router.navigate(['entrada'], { relativeTo: this.route });
  }

  /* Funciones para Posts */
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

  /* Funciones para Noticias */
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

  /* Funciones para Categorias */
  mostrarCategorias(): void {
    const modal = new bootstrap.Modal(document.getElementById('categoriesModal'), {});
    modal.show();
  }

  agregarCategoria(categoria: string): void {
    const nuevaCategoria: Category = { name: categoria };
    this.categoryService.createCategory(nuevaCategoria).subscribe(categoria => {
      this.categoryService.getCategories().subscribe(categorias => {
        this.categorias = categorias;
      })
    });

  }

  editarCategoria(categoria: Category): void {
    const nuevaCategoria = prompt('Editar categoría:', categoria.name);
    if (nuevaCategoria && categoria._id) {
      categoria.name = nuevaCategoria;
      this.categoryService.updateCategory(categoria._id, categoria).subscribe(() => {
        this.categoryService.getCategories().subscribe(categorias => {
          this.categorias = categorias;
        });
      });
    }
  }

  eliminarCategoria(id: string): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Estás a punto de eliminar la categoría.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.deleteCategory(id).subscribe(() => {
          this.categoryService.getCategories().subscribe(categorias => {
            this.categorias = categorias;
          });
        });
      }
    });
  }


  /* Funciones para Usuarios */
  mostrarUsuarios(): void {
    const modal = new bootstrap.Modal(document.getElementById('usuariosModal'), {});
    modal.show();
  }

  mostrarFormularioUsuario(): void {
    this.usuarioForm.nativeElement.classList.toggle('d-none');
  }

  agregarUsuario(): void {
    const nuevoUsuario: User = {
      name: this.nuevoUsuario.name,
      email: this.nuevoUsuario.email,
      password: this.nuevoUsuario.password,
      role: this.nuevoUsuario.role,
      verified: true,
    };

    this.userService.createUser(nuevoUsuario).subscribe((usuario) => {
      this.userService.getUsers().subscribe((usuarios) => {
        this.usuarios = usuarios;
      });
      Swal.fire({
        icon: 'success',
        title: `Se ha creado el usuario con éxito!`,
      }).then(() => { });
    });
    // Limpiar el formulario
    this.nuevoUsuario = {
      name: '',
      email: '',
      password: '',
      role: UserRole.Commenter,
      verified: true,
    };
    this.usuarioForm.nativeElement.classList.add('d-none');
  }

  editarUsuario(usuario: User): void {
    if (usuario._id) {
      this.usuarioEditado.id = usuario._id;
      this.usuarioEditado.name = usuario.name;
      this.usuarioEditado.email = usuario.email;
      this.usuarioEditado.role = usuario.role;
    }
  }

  actualizarUsuario() {
    this.usuarioEditado.verified = true;
    this.userService.updateUser(this.usuarioEditado.id, this.usuarioEditado).subscribe(() => {
      this.userService.getUsers().subscribe(usuarios => {
        this.usuarios = usuarios;
        Swal.fire({
          icon: 'success',
          title: `Se ha actualizado el usuario con éxito!`,
        }).then(() => { });
      });
    });
  }

  eliminarUsuario(id: string): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Estás a punto de eliminar el usuario.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(id).subscribe(() => {
          this.userService.getUsers().subscribe(usuarios => {
            this.usuarios = usuarios;
          });
        });
      };
    });
  }

}