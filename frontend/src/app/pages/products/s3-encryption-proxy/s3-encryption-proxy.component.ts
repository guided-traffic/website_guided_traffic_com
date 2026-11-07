import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../../shared/icon/icon.component';

@Component({
  selector: 'app-s3-encryption-proxy',
  standalone: true,
  imports: [RouterLink, IconComponent],
  templateUrl: './s3-encryption-proxy.component.html',
  styleUrls: ['../product-detail.scss'],
})
export class S3EncryptionProxyComponent {}
