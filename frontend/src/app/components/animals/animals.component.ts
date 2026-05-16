import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-animals',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './animals.component.html',
})
export class AnimalsComponent {}
