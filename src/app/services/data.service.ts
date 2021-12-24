import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PROPERTIES } from 'src/assets/db';
import { Property } from '../interfaces/property';
import { map } from 'rxjs/operators';

import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  properties$!: Observable<Property[]> | unknown;

  constructor(private db: AngularFireDatabase) {}

  getProperties(): Observable<Property[]> {
    return this.db
      .list('/')
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => ({
            id: a.key,
            ...(a.payload.val() as any),
          }))
        )
      );
  }

  getProperty(id: number): Observable<Property | undefined> {
    return this.getProperties().pipe(
      map((properties) =>
        properties.find((property) => +property['id'] === +id)
      )
    );
  }
}
