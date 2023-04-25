import { Component, OnInit } from '@angular/core';

interface Faq {
  question: string;
  answer: string;
  showAnswer: boolean;
}

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  faqs: Faq[] = [
    {
      question: '¿Qué es un blog tecnológico?',
      answer: 'Un blog tecnológico es un sitio web donde se publican artículos y noticias relacionadas con la tecnología, como dispositivos electrónicos, aplicaciones, software y tendencias del sector.',
      showAnswer: false
    },
    {
      question: '¿Cómo puedo suscribirme al boletín?',
      answer: 'Para suscribirte al boletín, dirígete a la página principal de la aplicación y busca la sección "Suscríbete al boletín". Introduce tu dirección de correo electrónico y haz clic en "Suscribir".',
      showAnswer: false
    },
    {
      question: '¿Cómo puedo contactar con los autores de los artículos?',
      answer: 'Puedes contactar con los autores de los artículos utilizando la sección de comentarios en cada entrada del blog o buscando sus datos de contacto en la página "Acerca de nosotros" o en sus perfiles de redes sociales.',
      showAnswer: false
    },
    {
      question: '¿Puedo colaborar en el blog?',
      answer: 'Sí, aceptamos colaboraciones de profesionales y entusiastas de la tecnología. Envíanos tu propuesta de artículo a través de la página "Colabora con nosotros" y nos pondremos en contacto contigo si consideramos que tu contenido es adecuado para nuestro blog.',
      showAnswer: false
    },
    {
      question: '¿Puedo descargar la aplicación en mi dispositivo móvil?',
      answer: 'Sí, nuestra aplicación está disponible para dispositivos Android e iOS. Puedes descargarla desde Google Play Store o Apple App Store, según el sistema operativo de tu dispositivo.',
      showAnswer: false
    },
    {
      question: '¿Cómo puedo buscar contenido específico en el blog?',
      answer: 'Para buscar contenido específico en nuestro blog, utiliza la función de búsqueda en la parte superior de la página. Simplemente introduce las palabras clave relacionadas con el tema que te interesa y presiona "Enter" o haz clic en el icono de búsqueda.',
      showAnswer: false
    },
    {
      question: '¿Cómo puedo configurar las notificaciones de la aplicación?',
      answer: 'Para configurar las notificaciones, ve a la sección "Configuración" de la aplicación y selecciona "Notificaciones". Aquí podrás personalizar las notificaciones que deseas recibir, como nuevos artículos, eventos, actualizaciones y más.',
      showAnswer: false
    },
    {
      question: '¿Cómo puedo compartir artículos en mis redes sociales?',
      answer: 'Para compartir un artículo en tus redes sociales, abre el artículo que deseas compartir y busca los iconos de las redes sociales al final del contenido. Haz clic en el icono de la red social en la que deseas compartir el artículo y sigue las instrucciones en pantalla.',
      showAnswer: false
    }
  ]


  constructor() { }

  ngOnInit(): void {
  }

  toggleAnswer(faq: Faq): void {
    faq.showAnswer = !faq.showAnswer;
  }
}
