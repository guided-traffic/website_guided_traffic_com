import { Component, computed, input } from '@angular/core';
import { ICONS, Icon, IconName } from './icon.registry';

// Decorative: the text beside an icon carries the meaning, so the icon is hidden from assistive
// tech. Size comes from --icon-size, color from the surrounding text.
@Component({
  selector: 'app-icon',
  standalone: true,
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  host: { 'aria-hidden': 'true' },
})
export class IconComponent {
  readonly name = input.required<IconName>();

  protected readonly icon = computed<Icon>(() => ICONS[this.name()]);
}
