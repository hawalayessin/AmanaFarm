import { Component, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { StateService, Product } from '../../services/state.service';

declare const lucide: any;

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './products.component.html',
})
export class ProductsComponent {
  products: Product[] = [];
  showForm = false;
  form: Partial<Product> = {};

  constructor(public state: StateService) {
    effect(() => { this.products = state.products(); });
  }

  ngAfterViewInit() {
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  async addProduct() {
    const p: Product = {
      id: Date.now(), title: this.form.title || '', category: this.form.category || '',
      description: this.form.description || '', price: this.form.price || 0,
      unit: this.form.unit || '', location: this.form.location || '',
      imageUrl: this.form.imageUrl || '', contactPhone: this.form.contactPhone || '',
      userId: 0, createdAt: new Date().toISOString(),
    };
    await this.state.addProduct(p);
    this.showForm = false;
    this.form = {};
  }

  async deleteProduct(id: number) {
    await this.state.deleteProduct(id);
  }
}
