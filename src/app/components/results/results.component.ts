import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Result {
  rank: number;
  athlete: string;
  score: number;
}

interface CategoryResults {
  name: string;
  image: string;
  tilt: string;
  data: Result[];
}

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss'
})
export class ResultsComponent {
  categories: CategoryResults[] = [
    {
      name: 'Arco Olimpico - FEMMINILE',
      image: 'assets/images/location/rinfrescoImage.JPG',
      tilt: 'left',
      data: [
        { rank: 1, athlete: 'CAMPI Chiara', score: 134 },
        { rank: 2, athlete: 'CANTARELLI Sara', score: 123 },
        { rank: 3, athlete: 'PIETRASANTA Laura', score: 102 },
        { rank: 4, athlete: 'PASTORE Giada', score: 97 }
      ]
    },
    {
      name: 'Arco Olimpico - MASCHILE',
      image: 'assets/images/location/garaImage.JPG',
      tilt: 'right',
      data: [
        { rank: 1, athlete: 'SCOLARO Antonio', score: 134 },
        { rank: 2, athlete: 'MILANI Luca', score: 133 },
        { rank: 3, athlete: 'BRODINI Paolo', score: 131 },
        { rank: 4, athlete: 'TARELLI Andrea', score: 131 },
        { rank: 5, athlete: 'FICI Aldo', score: 125 },
        { rank: 6, athlete: 'COSTANZO Diego', score: 98 },
        { rank: 7, athlete: 'TORRE Alessandro', score: 91 }
      ]
    },
    {
      name: 'Arco Nudo - FEMMINILE',
      image: 'assets/images/location/corsoImage.JPG',
      tilt: 'left',
      data: [
        { rank: 1, athlete: 'CAPASSO Alessandra', score: 108 },
        { rank: 2, athlete: 'CANTONI Barbara', score: 90 },
        { rank: 3, athlete: 'FERRARINI Nadia', score: 56 },
        { rank: 4, athlete: 'MANGAOIL Klaudia', score: 37 }
      ]
    },
    {
      name: 'Arco Nudo - MASCHILE',
      image: 'assets/images/location/campionatiRovereto2025.jpg',
      tilt: 'right',
      data: [
        { rank: 1, athlete: 'IUSO Gerardo', score: 134 },
        { rank: 2, athlete: 'TARANTINO Andrea', score: 134 },
        { rank: 3, athlete: 'BASILICO Giuseppe', score: 119 },
        { rank: 4, athlete: 'BALLADORI Marco', score: 110 },
        { rank: 5, athlete: 'FUMAGALLI Alessandro', score: 109 },
        { rank: 6, athlete: 'MAIOLANI Matteo', score: 107 },
        { rank: 7, athlete: 'CERLENCO Marco', score: 88 },
        { rank: 8, athlete: 'BORRONI Gianluca', score: 88 },
        { rank: 9, athlete: 'FUMAGALLI Mattia', score: 81 },
        { rank: 10, athlete: 'CURCI Matteo', score: 79 },
        { rank: 11, athlete: 'FARINA Riccardo', score: 71 },
        { rank: 12, athlete: 'COLOMBINI Christian', score: 57 },
        { rank: 13, athlete: 'BIFFI Cesare', score: 48 },
        { rank: 14, athlete: 'LO TORTO Lorenzo', score: 44 },
        { rank: 15, athlete: 'PEVERELLI Lorenzo', score: 11 }
      ]
    }
  ];
}
