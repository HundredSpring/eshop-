import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {User} from "../../models/user"

@Component({
  selector: 'users-signup',
  templateUrl: './signup.component.html',
  styles: []
})
export class SignUpComponent implements OnInit {
  signupFormGroup: FormGroup;
  isSubmitted = false;
  authError = false;
  authMessage = 'Confirm Password are wrong';
  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._initSignUpForm();
  }

  private _initSignUpForm() {
    this.signupFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmpassword: ['', Validators.required],
      phone: ['', Validators.required],
      street: [''],
     apartment: [''],
      zip: [''],
      city: [''],
      country: [''],
    });
  }
  onClick(){
    this.router.navigate(['/login']);
  }
  onSubmit() {
    console.log(this.signupForm.name.value)
    const user: User = {
      name: this.signupForm.name.value,
      email: this.signupForm.email.value,
      password: this.signupForm.password.value,
      phone: this.signupForm.phone.value,
      street: this.signupForm.street.value,
      apartment: this.signupForm.apartment.value,
      zip: this.signupForm.zip.value,
      city: this.signupForm.city.value,
      country: this.signupForm.country.value
    };
    console.log(this.signupFormGroup.invalid)
    //if (this.signupFormGroup.invalid) return;
    console.log(user)
    this.auth.signup(user).subscribe(
      (user) => {
        this.router.navigate(['/login']);
      },
      (error: HttpErrorResponse) => {
        this.authError = true;
        if (error.status !== 400) {
          this.authMessage = 'Error in the Server, please try again later!';
        }
      }
    );
  }

  get signupForm() {
    return this.signupFormGroup.controls;
  }
}
