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

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.animal = this.state.animals().find(a => a.id === id) || null;
  }

  ngAfterViewInit() {
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  fmt(n: string | number): string { return this.state.fmtPrice(n); }

  openWa() {
    if (!this.animal) return;
    let phone = String(this.animal.phone || '').replace(/\D/g, '');
    if (phone.length === 8) phone = '216' + phone;
    if (!/^\d{11,12}$/.test(phone)) return;
    const msg = encodeURIComponent(`مرحبا، نحب نسأل على ${this.animal.name} بسعر ${this.fmt(this.animal.price)} دت في ${this.animal.location}`);
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank', 'noopener,noreferrer');
  }
}
