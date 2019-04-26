import { FormBuilder, Validators } from '@angular/forms';

import { AppForm } from '../../app.form';
import { mustMatch } from '../users.validators';

export class SignupForm extends AppForm {
  constructor() {
    /* Initialize the form
     */
    super(
      new FormBuilder().group({
        first_name: ['', [Validators.required, Validators.minLength(2)]],
        last_name: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        password2: ['', [Validators.required]]
      }).controls,
      mustMatch('password', 'password2')
    );
  }
}
