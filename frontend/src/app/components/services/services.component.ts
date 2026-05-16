import { Component, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { StateService, Worker, ProfessionalProfile, ServiceRequest } from '../../services/state.service';

declare const lucide: any;

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './services.component.html',
})
export class ServicesComponent {
  workers: Worker[] = [];
  profiles: ProfessionalProfile[] = [];
  showWorkerForm = false;
  showProfileForm = false;

  workerForm: Partial<Worker> = {};
  profileForm: Partial<ProfessionalProfile> = {};

  constructor(public state: StateService) {
    effect(() => { this.workers = state.workers(); });
    effect(() => { this.profiles = state.profiles(); });
  }

  ngAfterViewInit() {
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  async addWorker() {
    const w: Worker = {
      id: Date.now(), name: this.workerForm.name || '', title: this.workerForm.title || '',
      location: this.workerForm.location || '', experience: this.workerForm.experience || '',
      rating: 0, reviewCount: 0, completedJobs: 0, responseTime: '',
      price: Math.floor(Number(this.workerForm.price)) || 0,
      priceUnit: this.workerForm.priceUnit || '',
      available: true, skills: this.workerForm.skills || '', avatarUrl: '', coverUrl: '',
      description: this.workerForm.description || '',
    };
    await this.state.addWorker(w);
    this.showWorkerForm = false;
    this.workerForm = {};
  }

  async deleteWorker(id: number) {
    await this.state.deleteWorker(id);
  }

  async addProfile() {
    const p: ProfessionalProfile = {
      id: Date.now(), fullName: this.profileForm.fullName || '',
      region: this.profileForm.region || '', serviceType: this.profileForm.serviceType || '',
      experienceDescription: this.profileForm.experienceDescription || '',
      price: this.profileForm.price || 0, period: this.profileForm.period || '',
      availability: this.profileForm.availability || '', plan: 'basic',
      status: 'PENDING_REVIEW', createdAt: new Date().toISOString(),
    };
    await this.state.addProfile(p);
    this.showProfileForm = false;
    this.profileForm = {};
  }

  async deleteProfile(id: number) {
    await this.state.deleteProfile(id);
  }
}
