import { Component, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateService, AnimalAd } from '../../services/state.service';

declare const lucide: any;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  animals: AnimalAd[] = [];

  constructor(public state: StateService) {
    effect(() => { this.animals = state.animals(); });
  }
}
