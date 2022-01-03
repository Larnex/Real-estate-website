import { MaterialExampleModule } from './material.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MainPageComponent } from './components/main-page/main-page.component';
// Reactive Form
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Carousel
import { IvyCarouselModule } from 'angular-responsive-carousel';

// Firebase
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { PropertyDetailsComponent } from './components/property-details/property-details.component';

// Angular Material Form
import { MatFormFieldModule } from '@angular/material/form-field';
import { PropertiesComponent } from './components/properties/properties.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainPageComponent,
    PropertyDetailsComponent,
    PropertiesComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    IvyCarouselModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MaterialExampleModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
