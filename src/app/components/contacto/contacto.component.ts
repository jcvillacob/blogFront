import { Component } from '@angular/core';

interface Contacto {
  nombre: string;
  email: string;
  asunto: string;
  mensaje: string;
}

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {
  contacto: Contacto = {
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
  };

  enviarFormulario() {
    // Aquí puedes manejar el envío del formulario, como enviar un correo electrónico o guardar la información en una base de datos
    console.log('Formulario enviado:', this.contacto);
    alert('¡Gracias por contactarnos! Hemos recibido tu mensaje y nos pondremos en contacto contigo a la brevedad.');
  }
}
