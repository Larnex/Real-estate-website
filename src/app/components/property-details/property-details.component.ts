import { DataService } from './../../services/data.service';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
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
  formGroup!: FormGroup;
  titleAlert: string = 'To pole jest wymagane';

  post: any = '';

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private formBuilder: FormBuilder
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

    this.createForm();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }

  createForm() {
    let emailregex: RegExp =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let phoneregex: RegExp = /^(\+\d{1,3}[- ]?)?\d{9}$/;

    this.formGroup = this.formBuilder.group({
      name: [null, Validators.required],
      phone: [null, [Validators.pattern(phoneregex)]],
      email: [null, [Validators.required, Validators.pattern(emailregex)]],
      message: [null, [Validators.required, Validators.minLength(5)]],
    });
  }

  get name() {
    return this.formGroup.get('name') as FormControl;
  }

  onSubmit(post: any) {
    this.post = post;
  }
}
