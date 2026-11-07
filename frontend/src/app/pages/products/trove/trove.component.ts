import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../../shared/icon/icon.component';
import { TroveFlowComponent } from './trove-flow/trove-flow.component';

@Component({
  selector: 'app-trove',
  standalone: true,
  imports: [RouterLink, TroveFlowComponent, IconComponent],
  templateUrl: './trove.component.html',
  styleUrls: ['../product-detail.scss', './trove.component.scss'],
})
export class TroveComponent {}
