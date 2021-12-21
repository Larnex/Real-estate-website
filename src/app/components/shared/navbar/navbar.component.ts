import { Component, ElementRef, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    const navToggle =
      this.elementRef.nativeElement.querySelector('.nav-toggle');
    const navMenu = this.elementRef.nativeElement.querySelector('.nav-menu');

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
