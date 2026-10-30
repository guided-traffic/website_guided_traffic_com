import { Component } from '@angular/core';
import { drawFrame } from './perspective-t.geometry';

@Component({
  selector: 'app-perspective-t',
  standalone: true,
  templateUrl: './perspective-t.component.html',
  styleUrls: ['./perspective-t.component.scss'],
  host: { 'aria-hidden': 'true' },
})
export class PerspectiveTComponent {
  // A still drawing, computed once; the server renders it, no script runs for it in the browser
  readonly frame = drawFrame();
}
