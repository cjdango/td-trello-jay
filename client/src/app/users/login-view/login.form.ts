import { FormBuilder, Validators } from '@angular/forms';

import { AppForm } from '../../app.form';

export class LoginForm extends AppForm {
  constructor() {
    /* Initialize the form
     */
    super(
      new FormBuilder().group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]]
      }).controls
    );
  }
}
