import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-thanks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './thanks.component.html',
  styleUrl: './thanks.component.scss'
})
export class ThanksComponent {
  albumLink = 'https://photos.app.goo.gl/T4bhp42xQuvWb2iE9';
  
  // Queste sono le foto "eroe" che scorreranno nel carosello.
  // Dovrai caricarle in src/assets/images/highlights/ con questi nomi o cambiarli qui.
  highlights = [
    { url: '/assets/images/highlights/foto1.JPG', alt: 'Foto 1' },
    { url: '/assets/images/highlights/foto2.JPG', alt: 'Foto 2' },
    { url: '/assets/images/highlights/foto3.JPG', alt: 'Foto 3' },
    { url: '/assets/images/highlights/foto4.JPG', alt: 'Foto 4' },
    { url: '/assets/images/highlights/foto5.JPG', alt: 'Foto 5' },
    { url: '/assets/images/highlights/foto6.JPG', alt: 'Foto 6' }
  ];

  scrollTo(sectionId: string) {
  }
}
