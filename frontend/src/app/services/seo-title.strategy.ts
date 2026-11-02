import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, RouterStateSnapshot, TitleStrategy } from '@angular/router';

// Canonical origin of every page. Fixed on purpose: the SSR request URL is
// built from the Host header and must never leak into canonical or og:url.
export const SITE_ORIGIN = 'https://www.guided-traffic.com';

const SITE_NAME = 'Guided Traffic';

/**
 * Writes the search snippet of the active route into the document head:
 * <title>, meta description, canonical link and the matching Open Graph tags.
 * Runs on the server as well, so crawlers get the values in the first response.
 */
@Injectable({ providedIn: 'root' })
export class SeoTitleStrategy extends TitleStrategy {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const title = this.buildTitle(snapshot) ?? SITE_NAME;
    const description = this.deepestChild(snapshot.root).data['description'] as string | undefined;
    const url = SITE_ORIGIN + snapshot.url.split(/[?#]/)[0];

    this.title.setTitle(title);
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:url', content: url });
    if (description) {
      this.meta.updateTag({ name: 'description', content: description });
      this.meta.updateTag({ property: 'og:description', content: description });
    }
    this.setCanonical(url);
  }

  private deepestChild(route: ActivatedRouteSnapshot): ActivatedRouteSnapshot {
    return route.firstChild ? this.deepestChild(route.firstChild) : route;
  }

  private setCanonical(url: string): void {
    let link = this.document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}
