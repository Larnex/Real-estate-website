import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MainPageComponent } from './components/main-page/main-page.component';

// Carousel
import { IvyCarouselModule } from 'angular-responsive-carousel';

// Firebase
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { PropertyDetailsComponent } from './components/property-details/property-details.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainPageComponent,
    PropertyDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    IvyCarouselModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
