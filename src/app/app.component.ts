import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { ResultsComponent } from './components/results/results.component';
import { ThanksComponent } from './components/thanks/thanks.component';
import { FooterComponent } from './components/footer/footer.component';
import { BackToTopComponent } from './shared/back-to-top/back-to-top.component';
import { GalleryComponent } from './components/gallery/gallery.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    HeroComponent,
    GalleryComponent,
    ResultsComponent,
    ThanksComponent,
    FooterComponent,
    BackToTopComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'arcieri-del-sole-50th';
}
