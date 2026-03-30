import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <header>
      <nav>
        <a routerLink="/" class="logo">Guided Traffic</a>
        <ul>
          <li><a routerLink="/">Home</a></li>
          <li><a routerLink="/features">Features</a></li>
        </ul>
      </nav>
    </header>
    <main>
      <router-outlet />
    </main>
    <footer>
      <p>&copy; 2026 Guided Traffic</p>
    </footer>
  `,
  styles: [`
    header {
      background: #1a1a2e;
      color: #fff;
      padding: 1rem 2rem;
    }
    nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      max-width: 1200px;
      margin: 0 auto;
    }
    .logo {
      font-size: 1.4rem;
      font-weight: 700;
      color: #00d4ff;
      text-decoration: none;
    }
    ul {
      display: flex;
      list-style: none;
      gap: 1.5rem;
    }
    ul a {
      color: #ccc;
      text-decoration: none;
      &:hover { color: #fff; }
    }
    main {
      min-height: calc(100vh - 140px);
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }
    footer {
      background: #1a1a2e;
      color: #888;
      text-align: center;
      padding: 1rem;
    }
  `]
})
export class AppComponent {
  title = 'Guided Traffic';
}
