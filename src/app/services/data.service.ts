import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PROPERTIES } from 'src/assets/db';
import { Property } from '../interfaces/property';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {}

  getProperties(): Observable<Property[]> {
    return of(PROPERTIES);
  }

  getProperty(id: number): Observable<Property | undefined> {
    return this.getProperties().pipe(
      map((properties) => properties.find((property) => property.id === id))
    );
  }
}
