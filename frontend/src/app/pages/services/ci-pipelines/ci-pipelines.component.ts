import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ci-pipelines',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './ci-pipelines.component.html',
  styleUrls: ['../service-detail.scss'],
})
export class CiPipelinesComponent {}
