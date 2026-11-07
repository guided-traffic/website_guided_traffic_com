import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../../shared/icon/icon.component';

@Component({
  selector: 'app-internal-secrets-operator',
  standalone: true,
  imports: [RouterLink, IconComponent],
  templateUrl: './internal-secrets-operator.component.html',
  styleUrls: ['../product-detail.scss'],
})
export class InternalSecretsOperatorComponent {}
