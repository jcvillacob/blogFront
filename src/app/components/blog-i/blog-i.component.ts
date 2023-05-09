import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../../models/post.model';
import { PostService } from '../../services/post.service';
import { Comment } from '../../models/comment.model';
import { User } from '../../models/user.model';
import { CommentService } from 'src/app/services/comment.service';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-blog-i',
  templateUrl: './blog-i.component.html',
  styleUrls: ['./blog-i.component.css']
})
export class BlogIComponent implements OnInit {
  postId: string = '';
  userId: string | null = null;
  userRole: string | null = null;
  isAuthenticated: boolean = false;
  authSubscription: Subscription = new Subscription(); // Inicializa la propiedad con un valor predeterminado
  post: Post | null = null;
  comments: Comment[] = [];  // Añade esta propiedad al inicio de la clase
  newComment: Comment = { content: '' };
  loader: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postService: PostService,
    private commentService: CommentService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.userRole = this.authService.getUserRole();
    this.postId = this.route.snapshot.params['id'];
    this.authSubscription = this.authService.isAuthenticated$.subscribe(
      isAuthenticated => {
        this.isAuthenticated = isAuthenticated;
        this.postService.getPost(this.postId).subscribe(post => {
          this.post = post;
          this.commentService.getComments(this.postId).subscribe(comments => {
            this.comments = comments;
            this.loader = false;
          });
        });
      }
    );
  }

  submitComment(): void {
    if (!this.isAuthenticated) {
      this.router.navigate(['/login']); // Redirige al usuario a la página de inicio

    }
    if (this.post) {
      this.newComment.post = this.route.snapshot.params['id'];
      this.newComment.content = this.parseContent(this.newComment.content);
      this.commentService.createComment(this.newComment).subscribe((comment) => {
        this.comments.push(comment);
        this.newComment = {
          content: ''
        };
        this.commentService.getComments(this.postId).subscribe(comments => {
          this.comments = comments;
        });
      });
    }
  }

  editComment(comment: Comment): void {
    comment.editing = true;
    comment.content = this.reverseParseContent(comment.content);
  }

  updateComment(comment: Comment): void {
    if (comment._id) { // Agrega esta línea para verificar si comment._id está definido
      comment.editing = false;
      comment.content = this.parseContent(comment.content);
      this.commentService.updateComment(comment._id, comment).subscribe((updatedComment) => {
        const index = this.comments.findIndex((c) => c._id === updatedComment._id);
        if (index !== -1) {
          this.comments[index] = updatedComment;
        }
        this.commentService.getComments(this.postId).subscribe(comments => {
          this.comments = comments;
        });
      });
    } else {
      console.error('Error: El ID del comentario no está definido.');
    }
  }

  cancelEdit(comment: Comment): void {
    comment.editing = false;
    comment.content = this.parseContent(comment.content);
  }

  deleteComment(id: any): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Estás a punto de eliminar el comentario.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.commentService.deleteComment(id).subscribe({
          next: () => {
            this.commentService.getComments(this.postId).subscribe(comments => {
              this.comments = comments;
            });
          },
          error: (error) => {
            console.error('Error al eliminar el comentario:', error);
          }
        });
      }
    });
  }

  parseContent(content: string): string {
    return content.replace(/\n/g, '<br>');
  }

  reverseParseContent(content: string): string {
    return content.replace(/<br\s*\/?>/gm, '\n');
  }

  goBack(): void {
    this.router.navigate(['/blogs']);
  }

}
