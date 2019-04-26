import { FormBuilder, Validators } from '@angular/forms';

import { AppForm } from '../../app.form';

export class PassResetForm extends AppForm {
  constructor() {
    /* Initialize the form
     */
    super(
      new FormBuilder().group({
        email: ['', [Validators.required, Validators.email]]
      }).controls
    );
  }
}
