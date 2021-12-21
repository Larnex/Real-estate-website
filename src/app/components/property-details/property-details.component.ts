import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { SubscriptionLike } from 'rxjs';
import { Image, Property } from 'src/app/interfaces/property';



@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.scss'],
})
export class PropertyDetailsComponent implements OnInit {
  subscription!: SubscriptionLike | null;
  property!: Property | undefined;
  priceForMetre!: number;
  activeSliderId!: string;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        let id = +params['id'];

        this.subscription = this.dataService
          .getProperty(id)
          .subscribe((property) => {
            this.property = property;

            this.priceForMetre = property!.price / property!.area;
          });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }

  cycleToSlide(photo: Image) {
    console.log(photo.id - 1);
    let slideId = photo.id - 1;

    this.activeSliderId = 'ngb-slide-' + slideId;
  }
}
