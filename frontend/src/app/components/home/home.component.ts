import { Component, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateService, AnimalAd, Worker, Product, WholesaleItem, ProfessionalProfile, ServiceRequest, JobOffer } from '../../services/state.service';

declare const lucide: any;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  animals: AnimalAd[] = [];
  workers: Worker[] = [];
  products: Product[] = [];
  wholesale: WholesaleItem[] = [];
  profiles: ProfessionalProfile[] = [];
  requests: ServiceRequest[] = [];
  jobs: JobOffer[] = [];

  constructor(public state: StateService) {
    effect(() => { this.animals = state.animals(); });
    effect(() => { this.workers = state.workers(); });
    effect(() => { this.products = state.products(); });
    effect(() => { this.wholesale = state.wholesale(); });
    effect(() => { this.profiles = state.profiles(); });
    effect(() => { this.requests = state.requests(); });
    effect(() => { this.jobs = state.jobs(); });
  }

  ngAfterViewInit() {
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  get totalAnimals() { return this.animals.length; }
  get totalWorkers() { return this.workers.length; }
  get totalProfiles() { return this.profiles.length; }
  get totalProducts() { return this.products.length; }
  get totalListings() { return this.animals.length + this.products.length + this.wholesale.length; }
}
