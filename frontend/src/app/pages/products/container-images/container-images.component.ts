import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-container-images',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './container-images.component.html',
  styleUrls: ['../product-detail.scss'],
})
export class ContainerImagesComponent {}
