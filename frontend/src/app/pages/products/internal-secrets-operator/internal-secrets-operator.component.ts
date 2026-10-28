import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-internal-secrets-operator',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './internal-secrets-operator.component.html',
  styleUrls: ['../product-detail.scss'],
})
export class InternalSecretsOperatorComponent {}
