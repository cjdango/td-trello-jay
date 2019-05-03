import {
  Component,
  OnInit,
  ViewChild,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { FormGroupDirective } from '@angular/forms';

import { ArchiveBoardFormForm } from './archive-board-form.form';
import { BoardService } from '../board.service';
import { AlertService } from 'src/app/components/alert/alert.service';

@Component({
  selector: 'app-archive-board-form',
  templateUrl: './archive-board-form.component.html',
  styleUrls: ['./archive-board-form.component.scss']
})
export class ArchiveBoardFormComponent implements OnInit {
  @ViewChild('f') ngForm: FormGroupDirective;
  @Output() archiveBoard = new EventEmitter<any>();
  @Input() boardPK: string;

  archiveBoardForm: ArchiveBoardFormForm;

  constructor(
    private boardService: BoardService,
    private alertService: AlertService
  ) {
    this.archiveBoardForm = new ArchiveBoardFormForm();
  }

  ngOnInit() {}

  onSubmit() {
    // Clear alert message.
    // There might be message from previous
    // onSubmit() calls
    this.alertService.clearMessage();
    this.archiveBoardForm.handleSubmit(this.sendRequest.bind(this));
  }

  sendRequest(payload) {
    this.boardService.updateBoard(payload, this.boardPK).subscribe(
      data => {
        this.archiveBoardForm.handleSuccess();
        this.ngForm.resetForm();
        this.archiveBoard.emit(data);
      },
      err => {
        const nonFieldErrs = this.archiveBoardForm.handleErrors(err);

        // Handle non field errors separately
        if (nonFieldErrs) {
          this.alertService.error(nonFieldErrs[0]);
        }
      }
    );
  }
}
