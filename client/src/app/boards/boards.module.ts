import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SortablejsModule } from 'angular-sortablejs';

import { AppRoutingModule } from '../app-routing.module';
import { MatModule } from '../mat.module';
import { BoardsViewComponent } from './boards-view/boards-view.component';
import { AddBoardFormComponent } from './add-board-form/add-board-form.component';
import { BoardDetailsComponent } from './board-details/board-details.component';
import { AddColumnFormComponent } from './add-column-form/add-column-form.component';
import { AddTicketFormComponent } from './add-ticket-form/add-ticket-form.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';

@NgModule({
  declarations: [
    BoardsViewComponent,
    AddBoardFormComponent,
    BoardDetailsComponent,
    AddColumnFormComponent,
    AddTicketFormComponent,
    TicketListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatModule,
    AppRoutingModule,
    SortablejsModule
  ]
})
export class BoardsModule {}
