import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit, OnDestroy {

  backgroundImages: string[] = [
    'assets/images/hero/sole2026.jpg',
    '/assets/images/hero/sole2023.JPG',
    '/assets/images/hero/sole2019.jpeg',
    '/assets/images/hero/sole2017.JPG',
    '/assets/images/hero/sole2014.JPG',
    '/assets/images/hero/sole2011.jpg',
    '/assets/images/hero/sole2008.JPG',
    '/assets/images/hero/sole2003.JPG',
    '/assets/images/hero/sole1998.JPG',
    '/assets/images/hero/sole1984.jpg'
  ];

  currentImageIndex = 0;
  private intervalId: any;

  ngOnInit() {
    this.startSlideshow();
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  startSlideshow() {
    this.intervalId = setInterval(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.backgroundImages.length;
    }, 2000); // Change every 2 seconds
  }

  scrollTo(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
