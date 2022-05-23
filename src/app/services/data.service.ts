import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Property } from '../interfaces/property';
import { map } from 'rxjs/operators';

import { AngularFirestore, fromDocRef } from '@angular/fire/compat/firestore';
import { AngularFireUploadTask } from '@angular/fire/compat/storage';
import { FileUpload } from '../interfaces/file-upload.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  properties$!: Observable<Property[]> | unknown;
  task!: AngularFireUploadTask;
  snapshot!: Observable<any>;
  downloadURL!: string;

  constructor(private db: AngularFirestore) {}

  getProperties() {
    return this.db.collection<Property>('properties').valueChanges();
  }

  getProperty(id: string): Observable<Property | undefined> {
    return this.getProperties().pipe(
      map((properties) => properties.find((property) => property['id'] == id))
    );
  }

  async addProperty(property: Property) {
    let whichCollection: string = (property.hidden as boolean)
      ? 'hiddenProperties'
      : 'properties';

    const docRef = await this.db.collection(whichCollection as string).add({
      ...property,
    });

    docRef.update({ id: docRef.id });
  }

  deleteProperty(id: string) {
    return this.db.collection('properties').doc(id).delete();
  }

  updateProperty(id: string, property: Property) {
    console.log('property:', property);
    console.log('id:', id);
    return this.db.collection('properties').doc(id).update(property);
  }

  saveFileData(fileUpload: FileUpload) {
    console.log(fileUpload);
  }
}
