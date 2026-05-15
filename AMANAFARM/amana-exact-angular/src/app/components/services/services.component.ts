import { Component, OnInit, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';

declare const lucide: any;

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './services.component.html',
})
export class ServicesComponent implements AfterViewInit {
  ngAfterViewInit() {
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }
}
