import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';

import { GuestService } from '../users.guest.service';
import { AlertService } from 'src/app/components/alert/alert.service';
import { PassResetForm } from './pass-reset.form';

/**
 * @ngForm Used to reset form since FormGroup.reset()
 * won't work when using material angular.
 */
@Component({
  selector: 'app-password-reset-view',
  templateUrl: './password-reset-view.component.html',
  styleUrls: ['./password-reset-view.component.scss']
})
export class PasswordResetViewComponent implements OnInit {
  @ViewChild('f') ngForm: FormGroupDirective;

  passwordResetForm: PassResetForm;

  constructor(
    private guestService: GuestService,
    private alertService: AlertService
  ) {
    this.passwordResetForm = new PassResetForm();
  }

  ngOnInit() {}

  onSubmit() {
    // Clear alert message.
    // There might be message from previous
    // onSubmit() calls
    this.alertService.clearMessage();
    this.passwordResetForm.handleSubmit(this.sendRequest.bind(this));
  }

  private sendRequest(payload) {
    this.guestService.requestPasswordReset(payload).subscribe(
      () => {
        this.ngForm.resetForm();
        this.passwordResetForm.handleSuccess();
        this.alertService.success(
          'An email containing confirmation link has been successfuly sent.'
        );
      },
      err => {
        const nonFieldErrs = this.passwordResetForm.handleErrors(err);

        // Handle non field errors separately
        if (nonFieldErrs) {
          this.alertService.error(nonFieldErrs[0]);
        }
      }
    );
  }
}
