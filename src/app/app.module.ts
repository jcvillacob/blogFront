import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

/* Servicios */
import { CategoryService } from './services/category.service';
import { PostService } from './services/post.service';
import { UserService } from './services/user.service';
import { CommentService } from './services/comment.service';

/* Componentes */
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { FaqComponent } from './components/faq/faq.component';
import { BlogIComponent } from './components/blog-i/blog-i.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { AutoresComponent } from './components/autores/autores.component';
import { AuthInterceptor } from './auth.interceptor';
import { EntradaComponent } from './components/autores/entrada/entrada.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    BlogsComponent,
    FaqComponent,
    BlogIComponent,
    ContactoComponent,
    LoginComponent,
    AutoresComponent,
    EntradaComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    CategoryService,
    UserService,
    PostService,
    CommentService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
