import { AuthService } from './auth.service';
import { CanReadGuard } from './../guards/can-read.guard';
import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { Property } from '../interfaces/property';
import * as _ from 'lodash';
import { StringLiteralLike } from 'typescript';
import { thru } from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  // unwrapped arrays from firebase
  properties: any = [];
  filteredProperties!: any;
  isAuthenticated: boolean;

  // filter-able properties

  city!: string;
  type!: string;
  transactionType!: string;

  priceStart!: number;
  priceEnd!: number;

  areaStart!: number;
  areaEnd!: number;

  floorStart!: number;
  floorEnd!: number;

  yearStart!: number;
  yearEnd!: number;

  roomsStart!: number;
  roomsEnd!: number;

  // Active filter rules
  filters: any = {};

  constructor(private dataService: DataService, private auth: AuthService) {
    this.auth
      .isLoggedIn()
      .then((value) => (this.isAuthenticated = value as boolean));
    this.dataService.getProperties().subscribe((properties) => {
      properties.map((property) => {
        if (property.hidden && this.isAuthenticated) {
          this.properties.push(property);
        } else if (!property.hidden) {
          this.properties.push(property);
        }
      });

      this.applyFilter();
    });
  }

  public applyFilter() {
    this.filteredProperties = _.filter(
      this.properties,
      _.conforms(this.filters)
    );
  }

  // filter property by equality to rule
  public filterExact(property: string, rule: any) {
    if (rule == 'any') {
      this.removeFilter(property);

      return;
    }

    this.filters[property] = (val: any) => val == rule;
    this.applyFilter();
  }

  // filter properties with numbers less than rule
  public filterMoreThan(property: string, rule: number) {
    if (this[property + 'End']) {
      this.filters[property] = (val: any) =>
        val >= +rule && val <= this[property + 'End'];
    } else {
      this.filters[property] = (val: any) => +val >= +rule;
    }

    this.applyFilter();
  }

  // filter properties with numbers more than rule
  public filterLessThan(property: string, rule: number) {
    if (rule.toString() == '') {
      this.removeFilter(property + 'End');

      return;
    }

    if (this[property + 'Start']) {
      this.filters[property] = (val: any) =>
        +val <= +rule && val >= this[property + 'Start'];
    } else {
      this.filters[property] = (val: any) => val <= +rule;
    }

    this.applyFilter();
  }

  // removes filter
  public removeFilter(property: string) {
    if (property.includes('End')) {
      this[property.replace('End', 'Start')] = null;
      delete this.filters[property.replace('End', '')];
    } else {
      delete this.filters[property];
      this[property] = null;
    }

    this.applyFilter();
  }

  public removeAllFilters() {
    this.filters = {};

    this.applyFilter();
  }
}
