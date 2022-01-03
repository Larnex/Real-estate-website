import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Property } from '../interfaces/property';
import { finalize, map, switchMap, tap, last } from 'rxjs/operators';

import { AngularFirestore, fromDocRef } from '@angular/fire/compat/firestore';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/compat/storage';
import { FileUpload } from '../interfaces/file-upload.model';
import { filter } from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  properties$!: Observable<Property[]> | unknown;
  task!: AngularFireUploadTask;
  snapshot!: Observable<any>;
  downloadURL!: string;

  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  getProperties() {
    return this.db.collection<Property>('properties').valueChanges();
  }

  getProperty(id: string): Observable<Property | undefined> {
    return this.getProperties().pipe(
      map((properties) => properties.find((property) => property['id'] == id))
    );
  }

  async addProperty(property: Property) {
    const docRef = await this.db.collection('properties').add({
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

  // async uploadImage(bucketName: any, file: any, index?: any) {
  //   if (file === '') return '';

  //   const uploadTask = await this.storage
  //     .ref(`/${bucketName}/${file.name}`)
  //     .put(file);

  //   return uploadTask.ref.getDownloadURL().then((fileURL) => fileURL);
  // }

  // startUpload(event: any, folder: any) {
  //   const files = event.target.files;
  //   console.log('files:', files.item(0));

  //   const path = `/${folder}`;
  //   console.log('path:', path);

  //   const ref = this.storage.ref(path);
  //   console.log('ref:', ref);

  //   this.task = this.storage.upload(path, files.item(0));
  //   console.log('this.task:', this.task);

  //   this.snapshot = this.task.snapshotChanges().pipe(
  //     tap(console.log),
  //     finalize(async () => {
  //       this.downloadURL = await ref.getDownloadURL().toPromise();
  //     })
  //   );
  // }
}
