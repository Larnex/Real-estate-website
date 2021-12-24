import { DataService } from './../../services/data.service';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { SubscriptionLike } from 'rxjs';
import { Property } from 'src/app/interfaces/property';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  host: {
    '(window: resize)': 'onWindowResize($event)',
  },
})
export class MainPageComponent implements OnInit, OnDestroy {
  subscription!: SubscriptionLike | null;
  properties!: Property[];
  selectedProperty!: Property;
  width: number = window.innerWidth;
  @ViewChild('carouselCell') cellHeight!: ElementRef;
  intervalId!: any;

  public carouselHeight!: number;
  public cellToShow!: number;

  constructor(
    private router: Router,
    public filter: FilterService,
    private elem: ElementRef
  ) {}

  ngOnInit(): void {
    // Make carousel responsive
    if (this.width > 1028) {
      this.carouselHeight = this.width * 0.35;
    } else if (this.width > 768) {
      this.carouselHeight = this.width * 0.45;
    } else {
      this.carouselHeight = this.width * 0.9;
    }

    this.responsiveCarousel();
  }

  // Revert carousel when filtering apply
  onSelectChange() {
    let carousel = this.elem.nativeElement.querySelector('.carousel-cells');
    carousel.style.transform = 'translateX(0px)';
  }

  // Responsive carousel on resize
  onWindowResize(event: any) {
    this.width = event.target.innerWidth;
    this.carouselHeight = this.cellHeight.nativeElement.clientHeight + 30;

    this.responsiveCarousel();
  }

  responsiveCarousel() {
    if (this.width > 1028) {
      this.cellToShow = 3;
    } else if (this.width > 768) {
      this.cellToShow = 2;
    } else {
      this.cellToShow = 1;
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }

  // Redirect to property details page on "szczegóły" button click
  showPropertyDetails(property: Property): void {
    this.selectedProperty = property;
    this.router.navigate(['/property', this.selectedProperty.id]);
  }
}
