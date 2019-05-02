import { Component, OnInit, Input } from '@angular/core';

import { ColumnService } from '../board-details/column.service';
import { TicketService } from '../board-details/ticket.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {
  @Input() tickets: Array<any>;
  @Input() columnPK: string;
  sortableOptions: { [key: string]: any };

  constructor(
    private columnService: ColumnService,
    private ticketService: TicketService
  ) {
    this.sortableOptions = {
      group: 'tickets',
      onEnd: evt => {
        const ticketPK = evt.item.dataset.id;
        const toColumnPK = evt.to.dataset.id;
        this.ticketService
          .updateTicket({ lst: toColumnPK }, ticketPK)
          .subscribe();
      },
      store: {
        set: sortable => {
          const cardsPositions = sortable.toArray().map(Number);
          this.columnService
            .updateColumn(
              { cards_positions: JSON.stringify(cardsPositions) },
              this.columnPK
            )
            .subscribe();
        }
      }
    };
  }

  ngOnInit() {}

  get ticketsPKs() {
    return this.tickets.map(ticket => ticket.pk);
  }
}
