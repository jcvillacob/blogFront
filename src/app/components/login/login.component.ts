import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  emailValue: string = '';
  passwordValue: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    if (!this.emailValue || !this.passwordValue) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor, completa los campos de correo usuario y contraseña.',
      });
      return;
    }

    // Validar el correo electrónico
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.emailValue)) {
      Swal.fire({
        icon: 'error',
        title: 'Correo electrónico inválido',
        text: 'Por favor, ingresa un correo electrónico válido.',
      });
      return;
    }

    // Validar la contraseña
    if (this.passwordValue.length < 8) {
      Swal.fire({
        icon: 'error',
        title: 'Contraseña inválida',
        text: 'La contraseña debe tener al menos 8 caracteres.',
      });
      return;
    }

    this.authService.login({ email: this.emailValue, password: this.passwordValue }).subscribe(() => {
      this.router.navigate(['/']);
    }, (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Error en el inicio de sesión',
        text: error.error.message || 'Hubo un problema al iniciar sesión. Inténtalo de nuevo más tarde.',
      });
    });
  }
}
