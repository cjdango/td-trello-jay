import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { Router } from '@angular/router';

import { GuestService } from '../users.guest.service';
import { AlertService } from 'src/app/components/alert/alert.service';
import { LoginForm } from './login.form';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss']
})
export class LoginViewComponent implements OnInit {
  @ViewChild('f') ngForm: FormGroupDirective;

  loginForm: LoginForm;

  constructor(
    private guestService: GuestService,
    private router: Router,
    private alertService: AlertService
  ) {
    this.loginForm = new LoginForm();
  }

  ngOnInit() {}

  onSubmit() {
    // Clear alert message.
    // There might be message from previous
    // onSubmit() calls
    this.alertService.clearMessage();
    this.loginForm.handleSubmit(this.sendRequest.bind(this));
  }

  sendRequest(payload) {
    this.guestService.login(payload).subscribe(
      data => {
        this.loginForm.handleSuccess();
        this.ngForm.resetForm();
        this.router.navigate(['/boards']);
      },
      err => {
        const nonFieldErrs = this.loginForm.handleErrors(err);

        // Handle non field errors separately
        if (nonFieldErrs) {
          this.alertService.error(nonFieldErrs[0]);
        }
      }
    );
  }
}
