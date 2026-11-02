import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TroveChestComponent } from './trove-chest/trove-chest.component';

@Component({
  selector: 'app-trove',
  standalone: true,
  imports: [RouterLink, TroveChestComponent],
  templateUrl: './trove.component.html',
  styleUrls: ['../product-detail.scss', './trove.component.scss'],
})
export class TroveComponent {}
