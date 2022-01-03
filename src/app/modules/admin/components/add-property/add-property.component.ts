import { FileUpload } from './../../../../interfaces/file-upload.model';
import { DataService } from './../../../../services/data.service';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Property } from 'src/app/interfaces/property';
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/compat/storage';
import { last, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddPropertyComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();
  form!: FormGroup;
  submitted = false;
  features: Array<[]> = [];
  faPlusCircle = faPlusCircle;
  faMinusCircle = faMinusCircle;
  task!: AngularFireUploadTask;

  currentFileUpload: FileUpload;

  constructor(
    public dataService: DataService,
    private fb: FormBuilder,
    private storage: AngularFireStorage,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.addFormControls();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  addFormControls(): void {
    this.form = this.fb.group({
      id: [0, Validators.required],
      hidden: [null, Validators.required],
      title: ['', Validators.required],
      subtitle: ['', Validators.required],
      img: this.fb.array([
        this.fb.group({
          url: ['', Validators.required],
          id: [''],
          name: [''],
        }),
      ]),
      type: ['', Validators.required],
      city: ['', Validators.required],
      distriction: ['', Validators.required],
      transactionType: ['', Validators.required],
      rooms: [null, Validators.required],
      area: [null, Validators.required],
      price: [null, Validators.required],
      year: [null, Validators.required],
      offer: ['', Validators.required],
      floor: [null, Validators.required],
      features: this.fb.array([]),
      description: ['', Validators.required],
      agent: this.fb.group({
        name: ['', Validators.required],
        agency: ['', Validators.required],
        photo: ['', Validators.required],
        phone: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
      }),
    });
  }

  get Images() {
    const img = this.form.get('img') as FormArray;
    return img;
  }

  addMoreImages(index: number) {
    if (index == 0) {
      this.Images.push(
        this.fb.group({ url: ['', Validators.required], id: [''], name: [''] })
      );
    } else {
      this.Images.removeAt(this.Images.value.indexOf(index));
    }
  }

  addToFeaturesArray(event: any) {
    event.preventDefault();

    if (event.target.value == '') {
      return;
    }

    this.form.value.features.push(event.target.value);
    this.features.push(event.target.value);

    event.target.value = '';
  }

  upload(event: any, path: string, index?: number) {
    console.log('index:', index);
    const file = event.target.files.item(0);

    this.currentFileUpload = new FileUpload(file);

    this.pushFileToStorage(this.currentFileUpload, path, index);
  }

  pushFileToStorage(fileUpload: FileUpload, basePath: string, index?: number) {
    console.log('index:', index);
    const filePath = `${basePath}/${fileUpload.file.name}`;
    console.log('filePath:', filePath);

    const storageRef = this.storage.ref(filePath);
    console.log('storageRef:', storageRef);

    const uploadTask = this.storage.upload(filePath, fileUpload.file);
    console.log('uploadTask:', uploadTask);

    uploadTask
      .snapshotChanges()
      .pipe(
        last(),
        switchMap(() => storageRef.getDownloadURL())
      )
      .subscribe((url) => {
        if (basePath == '/properties') {
          console.log('url:', url);

          this.form
            .get('img')
            ?.get([index as any])
            ?.get('url')
            ?.setValue(url);
        } else {
          console.log('url:', url);
          this.form.get('agent')?.get('photo')?.setValue(url);

          console.log(this.form.get('agent')?.get('photo')?.value);
        }
      });
  }

  async formSubmit() {
    if (this.form.invalid || this.features.length == 0) {
      console.error(this.form.value);
      return;
    }

    console.log(this.form.value);

    this.submitted = true;
    const property: Property = this.form.value;
    await this.dataService.addProperty(property);

    this.form.reset();
    this.router.navigate(['/admin']);
  }
}
