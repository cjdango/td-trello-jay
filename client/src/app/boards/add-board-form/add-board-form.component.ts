import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroupDirective } from '@angular/forms';

import { AddBoardFormForm } from './add-board-form.form';
import { BoardService } from '../boards-view/board.service';
import { AlertService } from 'src/app/components/alert/alert.service';

@Component({
  selector: 'app-add-board-form',
  templateUrl: './add-board-form.component.html',
  styleUrls: ['./add-board-form.component.scss']
})
export class AddBoardFormComponent implements OnInit {
  @ViewChild('f') ngForm: FormGroupDirective;
  @Output() addBoard = new EventEmitter<any>();

  addBoardForm: AddBoardFormForm;

  constructor(
    private boardService: BoardService,
    private alertService: AlertService
  ) {
    this.addBoardForm = new AddBoardFormForm();
  }

  ngOnInit() {}

  onSubmit() {
    // Clear alert message.
    // There might be message from previous
    // onSubmit() calls
    this.alertService.clearMessage();
    this.addBoardForm.handleSubmit(this.sendRequest.bind(this));
  }

  sendRequest(payload) {
    this.boardService.createBoard(payload).subscribe(
      data => {
        this.addBoardForm.handleSuccess();
        this.ngForm.resetForm();
        this.addBoard.emit(data);
      },
      err => {
        const nonFieldErrs = this.addBoardForm.handleErrors(err);

        // Handle non field errors separately
        if (nonFieldErrs) {
          this.alertService.error(nonFieldErrs[0]);
        }
      }
    );
  }
}
