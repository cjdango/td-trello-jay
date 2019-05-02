import { FormBuilder, Validators } from '@angular/forms';

import { AppForm } from '../../app.form';

export class AddTicketFormForm extends AppForm {
  constructor() {
    /* Initialize the form
     */
    super(
      new FormBuilder().group({
        title: ['', [Validators.required]]
      }).controls
    );
  }
}
