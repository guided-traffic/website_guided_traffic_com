import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PerspectiveTComponent } from './perspective-t/perspective-t.component';

@Component({
  selector: 'app-trove',
  standalone: true,
  imports: [RouterLink, PerspectiveTComponent],
  templateUrl: './trove.component.html',
  styleUrls: ['../product-detail.scss', './trove.component.scss'],
})
export class TroveComponent {}
