import { Property } from './../../interfaces/property';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FilterService } from 'src/app/services/filter.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss'],
})
export class PropertiesComponent implements OnInit {
  additionalFilters: boolean = false;
  selectedProperty!: Property;

  @ViewChild('filters') filterBtn!: ElementRef;

  constructor(public filter: FilterService, private router: Router) {}

  ngOnInit(): void {}

  // Redirect to property details page on "szczegóły" button click
  showPropertyDetails(property: Property): void {
    this.selectedProperty = property;
    this.router.navigate(['/property', this.selectedProperty.id]);
  }

  displayFiltering(): void {
    this.additionalFilters = !this.additionalFilters;

    if (!this.additionalFilters) {
      this.filterBtn.nativeElement.innerHTML = 'WIĘCEJ';
    } else {
      this.filterBtn.nativeElement.innerHTML = 'MNIEJ';
    }
  }
}
