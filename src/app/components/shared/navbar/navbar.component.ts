import { NavbarService } from './../../../services/navbar.service';
import { AuthService } from './../../../services/auth.service';
import { Component, ElementRef, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, AfterViewInit {
  constructor(
    private elementRef: ElementRef,
    public auth: AuthService,
    private navbar: NavbarService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    const navToggle =
      this.elementRef.nativeElement.querySelector('.nav-toggle');
    const navMenu = this.elementRef.nativeElement.querySelector('.nav-menu');

    this.navbar.navbarToggle(navToggle, navMenu);
  }
}
