import { ElementRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AnimationService {
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

  faqToggle(questions: any, accordions: any) {
    questions.forEach((question: any, i: number) => {
      question.addEventListener('click', () => {
        const visibility = accordions[i].getAttribute('data-visible');

        if (visibility === 'false') {
          accordions[i].setAttribute('data-visible', true);
        } else {
          accordions[i].setAttribute('data-visible', false);
        }
      });
    });
  }
}
