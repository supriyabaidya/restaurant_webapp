import { Component, OnInit, ViewChild} from '@angular/core';
import { Dish } from '../shared/dish'
import { DishService } from '../services/dish.service';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { switchMap } from 'rxjs/operators';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comment';
import {  MatSliderChange } from '@angular/material/slider';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
    
  dish: Dish;
 
  dishIds: string[];
  prev: string;
  next: string;
  

  usercommentForm: FormGroup;
  usercomment: Comment;

  formErrors = {
    'author': ''
  };

  validationMessages = {
    'author': {
      'required': 'Name is required.',
      'minlength': 'Name must be at least 2 characters long.',
      'maxlength': 'Name cannot be more than 25 characters long.'
    }
  };
  rating: number;

  @ViewChild('fform') usercommentFormDirective;

  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder) {
      this.createForm();
    }

  ngOnInit() {
    // this.dishservice.getDishIds()
    //   .subscribe(dishIdsFromService => this.dishIds = dishIdsFromService);

    // // const id = this.route.snapshot.params['id'];
    // // // this.dish = this.dishservice.getDish(id);
    // // this.dishservice.getDish(id)
    // //   .subscribe((dishFromService) => this.dish = dishFromService);
    // this.route.params
    //   .pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
    //   .subscribe(dishFromService => { this.dish = dishFromService; this.setPrevNext(dishFromService.id); });

    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
      .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }
  
  goBack(): void {
    this.location.back();
  }


  createForm() {
    this.usercommentForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      rating: 1,
      comment: ''
    });

    this.usercommentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.usercommentForm) { return; }
    const form = this.usercommentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit() {
    this.usercomment = this.usercommentForm.value;
    console.log(this.usercomment);
    this.usercommentForm.reset({
      author: '',
      rating: 1,
      comment:''
    });

    this.usercommentFormDirective.resetForm();
  }

  onInputChange(event: MatSliderChange) {
    console.log("This is emitted as the thumb slides");
    console.log(event.value);
    this.rating = event.value;
  }

  formatLabel(value: number) {
    if (value >= 5) {
      return Math.round(value / 5) + 'k';
    }

    return value;
  }

}
