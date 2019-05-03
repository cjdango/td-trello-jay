import { FormBuilder, Validators } from '@angular/forms';

import { AppForm } from 'src/app/app.form';

export class ArchiveBoardFormForm extends AppForm {
  constructor() {
    /* Initialize the form
     */
    super(
      new FormBuilder().group({
        is_archived: [true, [Validators.required]]
      }).controls
    );
  }
}
