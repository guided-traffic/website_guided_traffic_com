import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-kubernetes-cluster',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './kubernetes-cluster.component.html',
  styleUrls: ['../service-detail.scss'],
})
export class KubernetesClusterComponent {}
