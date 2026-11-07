import { Component } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { VIEW, drawFlow } from './trove-flow.geometry';

@Component({
  selector: 'app-trove-flow',
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: './trove-flow.component.html',
  styleUrls: ['./trove-flow.component.scss'],
  host: { 'aria-hidden': 'true' },
})
export class TroveFlowComponent {
  readonly viewBox = `${VIEW.x} ${VIEW.y} ${VIEW.width} ${VIEW.height}`;

  // Computed once; the browser plays the keyframes in it, no script runs for the motion
  readonly drawing = drawFlow();
}
