import { Component, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateService } from '../../services/state.service';

declare const lucide: any;

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
})
export class AboutComponent {
  totalAnimals = 0;
  totalWorkers = 0;
  totalProducts = 0;
  totalWholesale = 0;

  constructor(public state: StateService) {
    effect(() => { this.totalAnimals = state.animals().length; });
    effect(() => { this.totalWorkers = state.workers().length; });
    effect(() => { this.totalProducts = state.products().length; });
    effect(() => { this.totalWholesale = state.wholesale().length; });
  }

  ngAfterViewInit() {
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  get totalListings() { return this.totalAnimals + this.totalProducts + this.totalWholesale; }
}
