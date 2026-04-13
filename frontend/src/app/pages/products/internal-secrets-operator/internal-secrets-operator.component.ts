import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-internal-secrets-operator',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './internal-secrets-operator.component.html',
  styleUrls: ['./internal-secrets-operator.component.scss'],
})
export class InternalSecretsOperatorComponent {}
