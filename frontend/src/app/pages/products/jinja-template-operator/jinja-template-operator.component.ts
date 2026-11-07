import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../../shared/icon/icon.component';

@Component({
  selector: 'app-jinja-template-operator',
  standalone: true,
  imports: [RouterLink, IconComponent],
  templateUrl: './jinja-template-operator.component.html',
  styleUrls: ['../product-detail.scss'],
})
export class JinjaTemplateOperatorComponent {}
