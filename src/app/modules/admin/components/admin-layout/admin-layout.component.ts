import { NavbarService } from './../../../../services/navbar.service';
import { AuthService } from './../../../../services/auth.service';
import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: [
    '../../../../components/shared/navbar/navbar.component.scss',
    './admin-layout.component.scss',
  ],
})
export class AdminLayoutComponent implements OnInit, AfterViewInit {
  constructor(
    public auth: AuthService,
    private navbar: NavbarService,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const navToggle =
      this.elementRef.nativeElement.querySelector('.nav-toggle');
    const navMenu = this.elementRef.nativeElement.querySelector('.nav-menu');

    this.navbar.navbarToggle(navToggle, navMenu);
  }
}
