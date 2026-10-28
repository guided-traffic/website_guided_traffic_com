import { Component } from '@angular/core';

@Component({
  selector: 'app-helm-wheel',
  standalone: true,
  templateUrl: './helm-wheel.component.html',
  styleUrls: ['./helm-wheel.component.scss'],
  host: { 'aria-hidden': 'true' },
})
export class HelmWheelComponent {
  // Eight spokes; 0° is the king spoke, which stands on top when the rudder is amidships
  readonly spokes: number[] = [0, 45, 90, 135, 180, 225, 270, 315];

  // Hub bolts sit between the spokes
  readonly bolts: number[] = this.spokes.map((deg) => deg + 22.5);
}
