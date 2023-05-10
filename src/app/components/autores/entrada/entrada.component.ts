import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { Post } from 'src/app/models/post.model';
import { CategoryService } from 'src/app/services/category.service';
import { PostService } from 'src/app/services/post.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-entrada',
  templateUrl: './entrada.component.html',
  styleUrls: ['./entrada.component.css']
})

export class EntradaComponent implements OnInit {
  postForm: FormGroup;
  entryType: string = '';
  editingPostId: string | undefined = undefined;
  categories: Category[] = [];
  loader: boolean = true;

  constructor(private fb: FormBuilder,
    private router: Router,
    private categoryService: CategoryService,
    private postService: PostService,
    private route: ActivatedRoute) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      image: [null, Validators.required],
      content: ['', Validators.required],
      category: ['', Validators.required],
      tags: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
      this.route.queryParams.subscribe(params => {
        const postId = params['postId'];
        this.entryType = params['entrada'];
        if (postId) {
          this.postService.getPost(postId).subscribe(post => {
            post.content = this.reverseParseContent(post.content);
            this.loadPostData(post);
            const textarea = document.getElementById('content') as HTMLTextAreaElement;
            if (textarea) {
              textarea.style.height = 'auto';
              textarea.style.height = `${textarea.scrollHeight}px`;
            }
          }, error => {
            console.error(error);
            this.router.navigateByUrl('/autores');
          });
        }
      });
      this.loader = false;
    });

  }

  get tags(): FormArray {
    return this.postForm.get('tags') as FormArray;
  }

  addTag(): void {
    this.tags.push(this.fb.control(''));
  }

  onSubmit(): void {
    if (this.postForm.valid) {
      if (this.entryType === "Post") {
        if (this.editingPostId) {
          // Estás editando un post existente
          const postFormValue = this.postForm.value;
          postFormValue.content = this.parseContent(postFormValue.content);
          this.postService.updatePost(this.editingPostId, postFormValue)
            .subscribe(
              post => {
                console.log(post);
                Swal.fire({
                  icon: 'success',
                  title: `Se ha actualizado el ${this.entryType} con éxito!`,
                }).then(() => {
                  this.router.navigate(['/autores']);
                });
              },
              error => {
                console.error(error);
                Swal.fire({
                  icon: 'error',
                  title: 'Ha ocurrido un error al actualizar el post',
                  text: error.message,
                });
              }
            );
        } else {
          // Estás creando un nuevo post
          const postFormValue = this.postForm.value;
          postFormValue.content = this.parseContent(postFormValue.content);
          this.postService.createPost(postFormValue)
            .subscribe(
              post => {
                console.log(post);
                Swal.fire({
                  icon: 'success',
                  title: `Se ha creado el ${this.entryType} con éxito!`,
                }).then(() => {
                  this.router.navigate(['/autores']);
                });
              },
              error => {
                console.error(error);
                Swal.fire({
                  icon: 'error',
                  title: 'Ha ocurrido un error al crear el post o noticia',
                  text: error.message,
                });
              }
            );
        }
      }
    }
  }

  goBack(): void {
    this.router.navigate(['/autores']);
  }

  adjustTextareaHeight(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto'; // Restablece la altura
    textarea.style.height = `${textarea.scrollHeight}px`; // Ajusta la altura al contenido
  }

  loadPostData(post: Post): void {
    this.editingPostId = post._id;
    this.postForm.patchValue({
      title: post.title,
      content: post.content,
      category: post.category._id,
      tags: post.tags,
    });

    // Limpiar y agregar los tags en el formulario
    while (this.tags.length !== 0) {
      this.tags.removeAt(0);
    }
    post.tags.forEach(tag => {
      this.tags.push(this.fb.control(tag));
    });
  }

  parseContent(content: string): string {
    return content.replace(/\n/g, '<br>');
  }

  reverseParseContent(content: string): string {
    return content.replace(/<br\s*\/?>/gm, '\n');
  }

  handleFileInput(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.postForm.patchValue({ image: reader.result });
    };
    reader.readAsDataURL(file);
  }
}

