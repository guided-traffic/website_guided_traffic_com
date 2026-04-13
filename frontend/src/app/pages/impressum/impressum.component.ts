import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CreditsService, Credit } from '../../shared/credits/credits.service';

@Component({
  selector: 'app-impressum',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './impressum.component.html',
  styleUrls: ['./impressum.component.scss'],
})
export class ImpressumComponent {
  private readonly creditsService = inject(CreditsService);

  readonly credits: Credit[] = this.creditsService.credits;
}
