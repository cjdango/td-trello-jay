import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http'
import { Router } from '@angular/router';

import { mustMatch } from '../users.validators';
import { GuestService } from '../users.guest.service'
import { AlertService } from 'src/app/components/alert/alert.service';

@Component({
  selector: 'app-signup-view',
  templateUrl: './signup-view.component.html',
  styleUrls: ['./signup-view.component.scss']
})
export class SignupViewComponent implements OnInit {
  @ViewChild('f') ngForm: FormGroupDirective;

  submitted = false
  signupForm = this.fb.group({
    first_name: ['', [
      Validators.required,
      Validators.minLength(2)]
    ],
    last_name: ['', [
      Validators.required,
      Validators.minLength(2)]
    ],
    email: ['', [
      Validators.required,
      Validators.email]
    ],
    password: ['', [
      Validators.required,
      Validators.minLength(8)]
    ],
    password2: ['', [
      Validators.required]
    ]
  }, { validator: mustMatch('password', 'password2') });

  constructor(
    private fb: FormBuilder,
    private guestService: GuestService,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    if (!this.signupForm.valid) {
      return
    }

    this.submitted = true

    const payload = this.signupForm.value
    this.guestService.createUser(payload)
      .subscribe(
        () => {
          this.submitted = false
          this.ngForm.resetForm()
          this.router.navigateByUrl('/login')
          this.alertService.success("Success, You can now login to your account");
        }, 
        (err) => {
          this.submitted = false
          if (err instanceof HttpErrorResponse) {
            const validationErrors = err.error
            const nonFieldErrs = validationErrors.non_field_errors
            if (nonFieldErrs) {
              this.alertService.error(nonFieldErrs[0])
            }

            if (err.status === 400) {
              Object.keys(err.error).forEach(prop => {
                const formControl = this.signupForm.get(prop);
                if (formControl) {
                  // activate the error message
                  formControl.setErrors({
                    serverError: validationErrors[prop]
                  });
                }
              });
            }
          }
        })
  }
}
