import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatModule } from '../mat.module';
import { BoardsViewComponent } from './boards-view/boards-view.component';
import { AddBoardFormComponent } from './add-board-form/add-board-form.component';
import { BoardDetailsComponent } from './board-details/board-details.component';
import { AddColumnFormComponent } from './add-column-form/add-column-form.component';

@NgModule({
  declarations: [BoardsViewComponent, AddBoardFormComponent, BoardDetailsComponent, AddColumnFormComponent],
  imports: [CommonModule, ReactiveFormsModule, MatModule]
})
export class BoardsModule {}
