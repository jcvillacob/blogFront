import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FaqComponent } from './components/faq/faq.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { LoginComponent } from './components/login/login.component';
import { AutoresComponent } from './components/autores/autores.component';
import { RoleGuard } from './services/role.guard';
import { BlogIComponent } from './components/blog-i/blog-i.component';
import { EntradaComponent } from './components/autores/entrada/entrada.component';

const routes: Routes = [
  { path: '', redirectTo: "/home", pathMatch: "full" },
  { path: 'home', component: HomeComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'blogs', component: BlogsComponent },
  { path: 'blog-i/:id', component: BlogIComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'autores', component: AutoresComponent, canActivate: [RoleGuard] },
  { path: 'autores/entrada', component: EntradaComponent, canActivate: [RoleGuard] },
  { path: '**', redirectTo: "/home", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
