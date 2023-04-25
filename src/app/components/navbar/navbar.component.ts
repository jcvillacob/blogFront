import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  menuOpen: boolean = false;

  constructor(private router: Router) { }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }
}