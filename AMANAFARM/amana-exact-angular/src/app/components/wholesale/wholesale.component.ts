import { Component, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';

declare const lucide: any;

@Component({
  selector: 'app-wholesale',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './wholesale.component.html',
})
export class WholesaleComponent implements AfterViewInit {
  ngAfterViewInit() {
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }
}
