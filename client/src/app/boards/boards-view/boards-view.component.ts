import { Component, OnInit } from '@angular/core';

import { BoardService } from './board.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-boards-view',
  templateUrl: './boards-view.component.html',
  styleUrls: ['./boards-view.component.scss']
})
export class BoardsViewComponent implements OnInit {
  boards: Array<any>;

  constructor(private boardService: BoardService) {}

  ngOnInit() {
    this.getBoards();
  }

  private getBoards() {
    this.boardService.fetchBoardList().subscribe(boards => {
      this.boards = boards;
    });
  }
}
