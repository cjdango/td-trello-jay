import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ColumnService } from './column.service';
import { BoardService } from '../boards-view/board.service';

@Component({
  selector: 'app-board-details',
  templateUrl: './board-details.component.html',
  styleUrls: ['./board-details.component.scss']
})
export class BoardDetailsComponent implements OnInit {
  columns: Array<any> = [];
  sortableOptions: { [key: string]: any };
  private boardPK: string;


  constructor(
    private route: ActivatedRoute,
    private columnService: ColumnService,
    private boardService: BoardService
  ) {
    this.boardPK = this.route.snapshot.paramMap.get('boardPK');
    this.sortableOptions = {
      group: 'columns',
      store: {
        set: sortable => {
          const cardsPositions = sortable.toArray().map(Number);
          this.boardService
            .updateBoard(
              { lists_positions: JSON.stringify(cardsPositions) },
              this.boardPK
            )
            .subscribe();
        }
      }
    };
  }

  ngOnInit() {
    this.columnService
      .fetchColumns(this.boardPK)
      .subscribe(columns => (this.columns = columns));
  }

  get columnsPKs(): Array<number> {
    return this.columns.map(column => column.pk);
  }
}
