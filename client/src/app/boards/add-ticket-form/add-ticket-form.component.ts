import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { AddTicketFormForm } from './add-ticket-form.form';
import { TicketService } from '../board-details/ticket.service';
import { AlertService } from 'src/app/components/alert/alert.service';

@Component({
  selector: 'app-add-ticket-form',
  templateUrl: './add-ticket-form.component.html',
  styleUrls: ['./add-ticket-form.component.scss']
})
export class AddTicketFormComponent implements OnInit {
  @ViewChild('f') ngForm: FormGroupDirective;
  @Output() addTicket = new EventEmitter<any>();
  @Input() columnPK: string;

  addTicketForm: AddTicketFormForm;

  constructor(
    private ticketService: TicketService,
    private alertService: AlertService,
    private route: ActivatedRoute
  ) {
    this.addTicketForm = new AddTicketFormForm();
  }

  ngOnInit() {}

  onSubmit() {
    // Clear alert message.
    // There might be message from previous
    // onSubmit() calls
    this.alertService.clearMessage();
    this.addTicketForm.handleSubmit(this.sendRequest.bind(this));
  }

  sendRequest(payload) {
    this.ticketService.createTicket(payload, this.columnPK).subscribe(
      data => {
        this.addTicketForm.handleSuccess();
        this.ngForm.resetForm();
        this.addTicket.emit(data);
      },
      err => {
        const nonFieldErrs = this.addTicketForm.handleErrors(err);

        // Handle non field errors separately
        if (nonFieldErrs) {
          this.alertService.error(nonFieldErrs[0]);
        }
      }
    );
  }
}
