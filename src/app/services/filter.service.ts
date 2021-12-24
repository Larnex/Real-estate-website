import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { Property } from '../interfaces/property';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  // unwrapped arrays from firebase
  properties!: any;
  filteredProperties!: any;

  // filter-able properties
  city!: string;
  type!: string;
  transactionType!: string;

  // Active filter rules
  filters: any = {};

  constructor(private dataService: DataService) {
    this.dataService.getProperties().subscribe((properties) => {
      this.properties = properties;
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
  public filterLessThan(property: string, rule: number) {
    this.filters[property] = (val: any) => val < rule;
  }

  // removes filter
  public removeFilter(property: string) {
    delete this.filters[property];

    this[property] = null;

    this.applyFilter();
  }
}
