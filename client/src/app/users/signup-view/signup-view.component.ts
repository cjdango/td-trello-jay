import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { GuestService } from '../users.guest.service';
import { AlertService } from 'src/app/components/alert/alert.service';
import { SignupForm } from './signup.form';

@Component({
  selector: 'app-signup-view',
  templateUrl: './signup-view.component.html',
  styleUrls: ['./signup-view.component.scss']
})
export class SignupViewComponent implements OnInit {
  @ViewChild('f') ngForm: FormGroupDirective;

  signupForm: SignupForm;

  constructor(
    private guestService: GuestService,
    private router: Router,
    private alertService: AlertService
  ) {
    this.signupForm = new SignupForm();
  }

  ngOnInit() {}

  onSubmit() {
    // Clear alert message.
    // There might be message from previous
    // onSubmit() calls
    this.alertService.clearMessage();
    this.signupForm.handleSubmit(this.sendRequest.bind(this));
  }

  sendRequest(payload) {
    this.guestService.createUser(payload).subscribe(
      () => {
        this.ngForm.resetForm();
        this.router.navigateByUrl('/login');
        this.alertService.success('Success, You can now login to your account');
      },
      err => {
        const nonFieldErrs = this.signupForm.handleErrors(err);

        // Handle non field errors separately
        if (nonFieldErrs) {
          this.alertService.error(nonFieldErrs[0]);
        }
      }
    );
  }
}
