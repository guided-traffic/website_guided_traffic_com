import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../../shared/icon/icon.component';

@Component({
  selector: 'app-container-images',
  standalone: true,
  imports: [RouterLink, IconComponent],
  templateUrl: './container-images.component.html',
  styleUrls: ['../product-detail.scss'],
})
export class ContainerImagesComponent {}
