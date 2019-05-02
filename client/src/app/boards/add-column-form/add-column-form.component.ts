import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { AddColumnFormForm } from './add-column-form.form';
import { ColumnService } from '../board-details/column.service';
import { AlertService } from 'src/app/components/alert/alert.service';

@Component({
  selector: 'app-add-column-form',
  templateUrl: './add-column-form.component.html',
  styleUrls: ['./add-column-form.component.scss']
})
export class AddColumnFormComponent implements OnInit {
  @ViewChild('f') ngForm: FormGroupDirective;
  @Output() addColumn = new EventEmitter<any>();

  addColumnForm: AddColumnFormForm;

  private boardPK: string;

  constructor(
    private columnService: ColumnService,
    private alertService: AlertService,
    private route: ActivatedRoute
  ) {
    this.addColumnForm = new AddColumnFormForm();
    this.boardPK = this.route.snapshot.paramMap.get('boardPK');
  }

  ngOnInit() {}

  onSubmit() {
    // Clear alert message.
    // There might be message from previous
    // onSubmit() calls
    this.alertService.clearMessage();
    this.addColumnForm.handleSubmit(this.sendRequest.bind(this));
  }

  sendRequest(payload) {
    this.columnService.createColumn(payload, this.boardPK).subscribe(
      data => {
        this.addColumnForm.handleSuccess();
        this.ngForm.resetForm();
        this.addColumn.emit(data);
      },
      err => {
        const nonFieldErrs = this.addColumnForm.handleErrors(err);

        // Handle non field errors separately
        if (nonFieldErrs) {
          this.alertService.error(nonFieldErrs[0]);
        }
      }
    );
  }
}
