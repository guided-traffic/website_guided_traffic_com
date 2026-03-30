import { Component } from '@angular/core';

@Component({
  selector: 'app-features',
  standalone: true,
  template: `
    <section>
      <h1>Features</h1>
      <ul class="feature-list">
        <li>
          <h3>Automatische Provisionierung</h3>
          <p>Cluster werden in Minuten bereitgestellt.</p>
        </li>
        <li>
          <h3>Skalierung</h3>
          <p>Automatisches Scaling basierend auf Workload.</p>
        </li>
        <li>
          <h3>Monitoring</h3>
          <p>Integriertes Monitoring und Alerting.</p>
        </li>
      </ul>
    </section>
  `,
  styles: [`
    section { padding: 4rem 0; }
    h1 { font-size: 2.2rem; margin-bottom: 2rem; color: #1a1a2e; }
    .feature-list {
      list-style: none;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
    }
    .feature-list li {
      background: #fff;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 2rem;
    }
    h3 { color: #1a1a2e; margin-bottom: 0.5rem; }
    p { color: #666; }
  `]
})
export class FeaturesComponent {}
