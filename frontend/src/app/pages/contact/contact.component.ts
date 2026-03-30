import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  contactForm = {
    name: '',
    email: '',
    company: '',
    message: '',
  };

  onSubmit(): void {
    // TODO: integrate with backend API
  }
}
