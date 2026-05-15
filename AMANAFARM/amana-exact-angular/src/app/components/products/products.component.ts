import { Component, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';

declare const lucide: any;

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './products.component.html',
})
export class ProductsComponent implements AfterViewInit {
  ngAfterViewInit() {
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }
}
