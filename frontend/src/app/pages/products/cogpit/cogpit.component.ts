import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../../shared/icon/icon.component';

@Component({
  selector: 'app-cogpit',
  standalone: true,
  imports: [RouterLink, IconComponent],
  templateUrl: './cogpit.component.html',
  styleUrls: ['../product-detail.scss'],
})
export class CogpitComponent {}
