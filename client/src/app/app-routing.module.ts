import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupViewComponent } from './users/signup-view/signup-view.component';
import { LoginViewComponent } from './users/login-view/login-view.component';
import { PasswordResetViewComponent } from './users/password-reset-view/password-reset-view.component';
import { PasswordResetConfirmViewComponent } from './users/password-reset-confirm-view/password-reset-confirm-view.component';
import { BoardsViewComponent } from './boards/boards-view/boards-view.component';
import { BoardDetailsComponent } from './boards/board-details/board-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'signup', component: SignupViewComponent },
  { path: 'login', component: LoginViewComponent },
  { path: 'forgot-password', component: PasswordResetViewComponent },
  {
    path: 'reset-password/:uid/:token',
    component: PasswordResetConfirmViewComponent
  },
  { path: 'boards', component: BoardsViewComponent },
  { path: 'boards/:boardPK', component: BoardDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
