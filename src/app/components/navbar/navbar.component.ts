import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  menuOpen: boolean = false;
  isAuthenticated: boolean = false;
  authSubscription: Subscription = new Subscription(); // Inicializa la propiedad con un valor predeterminado

  constructor(private router: Router, private authService: AuthService) { } // Inyecta el servicio de autenticación

  ngOnInit(): void {
    this.authSubscription = this.authService.isAuthenticated$.subscribe(
      isAuthenticated => {
        this.isAuthenticated = isAuthenticated;
      }
    );
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  logout(): void {
    this.authService.logout(); // Llama a la función logout() del servicio de autenticación
    this.router.navigate(['/login']); // Redirige al usuario a la página de inicio
  }
}
