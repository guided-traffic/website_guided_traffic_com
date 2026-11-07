import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../../shared/icon/icon.component';

@Component({
  selector: 'app-dex-operator',
  standalone: true,
  imports: [RouterLink, IconComponent],
  templateUrl: './dex-operator.component.html',
  styleUrls: ['../product-detail.scss'],
})
export class DexOperatorComponent {}
