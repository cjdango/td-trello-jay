import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ColumnService } from './column.service';

@Component({
  selector: 'app-board-details',
  templateUrl: './board-details.component.html',
  styleUrls: ['./board-details.component.scss']
})
export class BoardDetailsComponent implements OnInit {
  columns: Array<any>;
  private boardPK: string;

  constructor(
    private route: ActivatedRoute,
    private columnService: ColumnService
  ) {
    this.boardPK = this.route.snapshot.paramMap.get('boardPK');
  }

  ngOnInit() {
    this.columnService
      .fetchColumns(this.boardPK)
      .subscribe(columns => (this.columns = columns));
  }
}
