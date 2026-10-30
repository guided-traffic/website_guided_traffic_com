import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cogpit',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cogpit.component.html',
  styleUrls: ['../product-detail.scss'],
})
export class CogpitComponent {}
