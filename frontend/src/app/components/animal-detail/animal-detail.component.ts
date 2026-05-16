import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { StateService } from '../../services/state.service';

declare const lucide: any;

@Component({
  selector: 'app-animal-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './animal-detail.component.html',
})
export class AnimalDetailComponent implements OnInit, AfterViewInit {
  animal: any = null;

  constructor(private route: ActivatedRoute, private state: StateService) {}

  async ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.animal = this.state.animals().find(a => a.id === id) || null;
    if (!this.animal) {
      try {
        const res = await fetch(`http://localhost:8081/api/animals/${id}`);
        if (res.ok) {
          const a = await res.json();
          this.animal = {
            id: a.id, name: a.title || '—', category: a.category || '',
            price: Number(a.price) || 0, location: a.wilaya || '',
            weight: a.zone || '', gender: a.gender || '', age: a.age || '',
            healthStatus: a.healthStatus || '', phone: a.phone || '',
            sellerName: a.trustedSeller ? 'بائع موثق' : 'مستخدم',
            sellerRating: 4.8, featured: a.featured || false,
            verified: a.trustedSeller || false,
            description: a.description || '',
          };
        }
      } catch {}
    }
  }

  ngAfterViewInit() {
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  fmt(n: string | number): string { return this.state.fmtPrice(n); }

  openWa() {
    if (!this.animal) return;
    let phone = String(this.animal.phone || '').replace(/\D/g, '');
    if (!phone) { alert('رقم الهاتف غير متوفر لهذا الإعلان'); return; }
    if (phone.length === 8) phone = '216' + phone;
    if (!/^\d{11,12}$/.test(phone)) { alert('رقم الهاتف غير صحيح'); return; }
    const msg = encodeURIComponent(`مرحبا، نحب نسأل على ${this.animal.name} بسعر ${this.fmt(this.animal.price)} دت في ${this.animal.location}`);
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank', 'noopener,noreferrer');
  }
}
