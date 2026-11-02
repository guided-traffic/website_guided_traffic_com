import { Component } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { VIEW, drawChest } from './trove-chest.geometry';

@Component({
  selector: 'app-trove-chest',
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: './trove-chest.component.html',
  styleUrls: ['./trove-chest.component.scss'],
  host: { 'aria-hidden': 'true' },
})
export class TroveChestComponent {
  readonly viewBox = `${VIEW.x} ${VIEW.y} ${VIEW.width} ${VIEW.height}`;

  // Computed once; the browser plays the keyframes in it, no script runs for the motion
  readonly drawing = drawChest();
}
