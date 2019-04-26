import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';

import { AppForm } from '../../app.form';
import { mustMatch } from '../users.validators';

export class PassResetConfirmForm extends AppForm {
  constructor() {
    /* Initialize the form
     */
    super(
      {
        new_password1: new FormControl('', [
          Validators.required,
          Validators.minLength(8)
        ]),
        new_password2: new FormControl('', Validators.required)
      },
      mustMatch('new_password1', 'new_password2')
    );
  }
}
