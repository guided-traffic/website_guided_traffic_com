import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="hero">
      <h1>Managed Kubernetes Clusters</h1>
      <p>Provisionierte Kubernetes Cluster – einfach, schnell, zuverlässig.</p>
      <a routerLink="/features" class="cta">Mehr erfahren</a>
    </section>
  `,
  styles: [`
    .hero {
      text-align: center;
      padding: 6rem 2rem;
    }
    h1 {
      font-size: 2.8rem;
      margin-bottom: 1rem;
      color: #1a1a2e;
    }
    p {
      font-size: 1.2rem;
      color: #555;
      margin-bottom: 2rem;
    }
    .cta {
      display: inline-block;
      padding: 0.8rem 2rem;
      background: #00d4ff;
      color: #1a1a2e;
      border-radius: 6px;
      text-decoration: none;
      font-weight: 600;
      &:hover { background: #00b8e6; }
    }
  `]
})
export class HomeComponent {}
