import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AnimationService } from '../../../services/animation.service';
import { AuthService } from './../../../services/auth.service';
import { Component, ElementRef, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, AfterViewInit {
  isLogged: boolean;

  constructor(
    private elementRef: ElementRef,
    public afAuth: AngularFireAuth,
    public auth: AuthService,
    private animation: AnimationService
  ) {
    this.isLogged = this.auth.isLogged;
  }

  ngOnInit(): void {
    console.log(this.isLogged);
  }

  ngAfterViewInit() {
    const navToggle =
      this.elementRef.nativeElement.querySelector('.nav-toggle');
    const navMenu = this.elementRef.nativeElement.querySelector('.nav-menu');

    this.animation.navbarToggle(navToggle, navMenu);
  }
}
