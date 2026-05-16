import { Component, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StateService, AnimalAd, Worker, Product, WholesaleItem, ProfessionalProfile, ServiceRequest, JobOffer } from '../../services/state.service';

declare const lucide: any;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
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
  currentTestimonial = 0;
  testimonials = [
    { stars: '★★★★★', text: 'نشرت إعلاني في 5 دقائق وبعت خروفي في 3 أيام. ما توقعتش يكون بهالسرعة.', initials: 'م.ش', name: 'محمد الشريف', loc: 'سوسة', result: 'باع 3 خرفان خلال أسبوع' },
    { stars: '★★★★★', text: 'لقيت بقرة حلوب بسعر منطقي ومن ولاية قريبة. الموقع سهّل عليّ كثير.', initials: 'ف.س', name: 'فاطمة بن سالم', loc: 'صفاقس', result: 'اشترت بقرة هولشتاين' },
    { stars: '★★★★★', text: 'الموقع سهّل عليّ البحث كثيرًا، وجدت ما أبحث عنه في أقل من يوم.', initials: 'ح.ر', name: 'الحاج رضا', loc: 'قابس', result: 'مستخدم منذ التأسيس' },
  ];

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

  goPost() {
    if (this.state.user()) {
      (document.getElementById('navPostBtn') as HTMLElement)?.click();
    } else {
      (document.getElementById('btnLoginHeader') as HTMLElement)?.click();
    }
  }

  browseAds() {
    document.getElementById('market')?.scrollIntoView({ behavior: 'smooth' });
  }

  prevTesti() {
    this.currentTestimonial = this.currentTestimonial === 0 ? this.testimonials.length - 1 : this.currentTestimonial - 1;
    setTimeout(() => { if (typeof lucide !== 'undefined') lucide.createIcons(); }, 0);
  }

  nextTesti() {
    this.currentTestimonial = this.currentTestimonial === this.testimonials.length - 1 ? 0 : this.currentTestimonial + 1;
    setTimeout(() => { if (typeof lucide !== 'undefined') lucide.createIcons(); }, 0);
  }
}
