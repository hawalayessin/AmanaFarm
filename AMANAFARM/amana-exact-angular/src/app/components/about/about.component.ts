import { Component, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';

declare const lucide: any;

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './about.component.html',
})
export class AboutComponent implements AfterViewInit {
  ngAfterViewInit() {
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }
}
