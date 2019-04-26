import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { GuestService } from '../users.guest.service';
import { AlertService } from 'src/app/components/alert/alert.service';
import { SetNewPassPayload } from './interface';
import { PassResetConfirmForm } from './pass-reset-confirm.form';

@Component({
  selector: 'app-password-reset-confirm-view',
  templateUrl: './password-reset-confirm-view.component.html',
  styleUrls: ['./password-reset-confirm-view.component.scss']
})
export class PasswordResetConfirmViewComponent implements OnInit {
  @ViewChild('f') ngForm: FormGroupDirective;

  passwordResetConfirmForm: PassResetConfirmForm;

  private paramMap: ParamMap;

  constructor(
    private guestService: GuestService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) {
    this.paramMap = this.route.snapshot.paramMap;
    this.passwordResetConfirmForm = new PassResetConfirmForm();
  }

  ngOnInit() {
  }

  onSubmit() {
    // Clear alert message.
    // There might be message from previous
    // onSubmit() calls
    this.alertService.clearMessage();
    this.passwordResetConfirmForm.handleSubmit(this.sendRequest.bind(this));
  }

  private sendRequest(payload: SetNewPassPayload) {
    const uid = this.paramMap.get('uid');
    const token = this.paramMap.get('token');
    const params = { uid, token };

    this.guestService.setNewPassword(payload, params).subscribe(
      () => {
        this.passwordResetConfirmForm.handleSuccess();
        this.ngForm.resetForm();
        this.router.navigateByUrl('/login');
        this.alertService.success(
          'Success, You can now login to your account using the new pasword'
        );
      },
      err => {
        const nonFieldErrs = this.passwordResetConfirmForm.handleErrors(err, {
          password: 'new_password1'
        });

        // Handle non field errors separately
        if (nonFieldErrs) {
          this.alertService.error(nonFieldErrs[0]);
        }
      }
    );
  }
}
