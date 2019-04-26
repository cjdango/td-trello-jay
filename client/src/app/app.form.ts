import { FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

export class AppForm extends FormGroup {
  submitted = false;

  /**
   * Use to handle form related things on submit.
   * @param cb Called if `this.value` is valid
   */
  handleSubmit(cb) {
    // Check form validity before submitting
    if (!this.valid) {
      return;
    }
    this.submitted = true;
    cb(this.value);
  }

  /**
   * Use to handle form related things on success.
   */
  handleSuccess() {
    this.submitted = false;
  }

  /**
   * Handle field errors.
   * @param err An HttpErrorResponse instance
   * @param mapObj Use to map `{'error_key_from_server': 'to_form_control_name'}`
   * e.g `{'password': 'new_password1'}`
   * @return `non_field_errors` or `null`
   */
  handleErrors(
    err,
    mapObj: { [key: string]: string } = {}
  ): { non_field_errors: Array<string> } | void {
    this.submitted = false;

    if (err instanceof HttpErrorResponse) {
      const validationErrors = err.error;
      const nonFieldErrs = validationErrors.non_field_errors;

      if (err.status === 400) {
        Object.keys(validationErrors).forEach(prop => {
          const formControlName = mapObj.hasOwnProperty(prop) ? mapObj[prop] : prop;

          // get the form control that matches it's name to the prop
          const formControl = this.get(formControlName);

          // check if such form control exist
          if (formControl) {
            // activate the error message
            formControl.setErrors({
              serverError: validationErrors[prop]
            });
          }
        });
      }

      return nonFieldErrs || null;
    }
  }
}
