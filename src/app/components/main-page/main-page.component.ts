import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubscriptionLike } from 'rxjs';
import { Property } from 'src/app/interfaces/property';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  subscription!: SubscriptionLike | null;

  constructor(private router: Router, private dataService: DataService) {}
  properties!: Property[];
  selectedProperty!: Property;

  ngOnInit(): void {
    this.subscription = this.dataService
      .getProperties()
      .subscribe((properties) => (this.properties = properties));
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }

  showPropertyDetails(property: Property): void {
    this.selectedProperty = property;
    this.router.navigate(['/property', this.selectedProperty.id]);
  }
}
