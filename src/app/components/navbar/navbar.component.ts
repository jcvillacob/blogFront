import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  menuOpen: boolean = false;
  userRole: string | null = null;
  isAuthenticated: boolean = false;
  routeSubscription: Subscription = new Subscription();
  authSubscription: Subscription = new Subscription(); // Inicializa la propiedad con un valor predeterminado

  constructor(private router: Router, private authService: AuthService) { } // Inyecta el servicio de autenticación

  ngOnInit(): void {
    this.updateUserRole();

    this.authSubscription = this.authService.isAuthenticated$.subscribe(isAuthenticated => {
        this.isAuthenticated = isAuthenticated;
        this.updateUserRole();
      }
    );

    this.routeSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.updateUserRole());
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  logout(): void {
    this.authService.logout(); // Llama a la función logout() del servicio de autenticación
    this.router.navigate(['/']); // Redirige al usuario a la página de inicio
  }

  updateUserRole(): void {
    this.userRole = this.authService.getUserRole();
  }
}