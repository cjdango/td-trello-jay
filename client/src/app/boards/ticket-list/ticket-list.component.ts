import { Component, OnInit, Input } from '@angular/core';

import { ColumnService } from '../board-details/column.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {
  @Input() tickets: Array<any>;
  @Input() columnPK: string;
  sortableOptions: { [key: string]: any };

  constructor(private columnService: ColumnService) {
    this.sortableOptions = {
      group: 'tickets',
      store: {
        set: sortable => {
          const cardsPositions = sortable.toArray().map(Number);

          this.columnService
            .updateColumn(
              { cards_positions: String(cardsPositions) },
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
