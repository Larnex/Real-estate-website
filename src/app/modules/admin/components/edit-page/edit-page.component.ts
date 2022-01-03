import { FileUpload } from './../../../../interfaces/file-upload.model';
import { DataService } from './../../../../services/data.service';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { last, switchMap, takeUntil } from 'rxjs/operators';
import { Property } from 'src/app/interfaces/property';
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
})
export class EditPageComponent implements OnInit {
  destroy$ = new Subject<void>();

  faPlusCircle = faPlusCircle;
  faMinusCircle = faMinusCircle;

  form: FormGroup;
  property: Property;

  submitted = false;

  currentFileUpload: FileUpload;
  features: Array<[]> = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private _formBuilder: FormBuilder,
    private storage: AngularFireStorage
  ) {}

  ngOnInit(): void {
    this.addFormControls();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  addFormControls() {
    this.route.params
      .pipe(
        switchMap((params) => {
          return this.dataService.getProperty(params['id']);
        })
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe((property) => {
        console.log('property:', property);
        this.property = property as Property;
        this.form = this._formBuilder.group({
          id: [this.property.id, Validators.required],
          hidden: [this.property.hidden, Validators.required],
          title: [this.property.title, Validators.required],
          subtitle: [this.property.subtitle, Validators.required],
          img: this._formBuilder.array([]),
          type: [this.property.type, Validators.required],
          city: [this.property.city, Validators.required],
          distriction: [this.property.distriction, Validators.required],
          transactionType: [this.property.transactionType, Validators.required],
          rooms: [this.property.rooms, Validators.required],
          area: [this.property.area, Validators.required],
          price: [this.property.price, Validators.required],
          year: [this.property.year, Validators.required],
          offer: [this.property.offer, Validators.required],
          floor: [this.property.floor, Validators.required],
          features: [this.property.features],
          description: [this.property.description, Validators.required],
          agent: this._formBuilder.group({
            name: [this.property.agent.name, Validators.required],
            agency: [this.property.agent.agency, Validators.required],
            photo: [this.property.agent.photo, Validators.required],
            phone: [this.property.agent.phone, Validators.required],
            email: [
              this.property.agent.email,
              [Validators.required, Validators.email],
            ],
          }),
        });

        const control = <FormArray>this.form.get('img');

        this.property.img.map((x) => {
          control.push(
            this._formBuilder.group({
              url: [x.url, Validators.required],
              name: [x.name],
            })
          );
        });

        // control.push(
        //   this.property.img.map((x) => {
        //     return this._formBuilder.group({});
        //   })
        // );

        // this.property.img.map((a) => {
        //   return this._formBuilder.group({
        //     url: [a.url],
        //     name: [a.name],
        //   });
        // }),

        console.log(this.form.value.img);
      });
  }

  get Images() {
    const img = this.form.get('img') as FormArray;
    return img;
  }

  addMoreImages(index: number) {
    if (index == 0) {
      this.Images.push(
        this._formBuilder.group({
          url: ['', Validators.required],
          id: [''],
          name: [''],
        })
      );
    } else {
      this.Images.removeAt(this.Images.value.indexOf(index));
    }
  }

  upload(event: any, path: string, index?: number) {
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

  addToFeaturesArray(event: any) {
    event.preventDefault();

    if (event.target.value == '') {
      return;
    }

    this.form.value.features.push(event.target.value);
    this.features.push(event.target.value);

    event.target.value = '';
  }

  async formSubmit() {
    // console.log(this.form.get('img')?.value);

    console.log(this.form.get('id')?.value);

    if (this.form.invalid || this.form.value.features == []) {
      console.error(this.form.value);
      return;
    }

    console.log(this.form.value);

    this.submitted = true;
    const property: Property = this.form.value;
    await this.dataService.updateProperty(property.id, property);

    this.form.reset();
    this.router.navigate(['/admin']);
  }
}
