import { ElementRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  navbarToggle(navToggle: any, navMenu: any) {
    navToggle.addEventListener('click', () => {
      const visibility = navMenu.getAttribute('data-visible');

      if (visibility === 'false') {
        navMenu.setAttribute('data-visible', true);
        navToggle.setAttribute('aria-expanded', true);
      } else {
        navMenu.setAttribute('data-visible', false);
        navToggle.setAttribute('aria-expanded', false);
      }
    });
  }
}
