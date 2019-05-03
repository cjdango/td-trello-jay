import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupViewComponent } from './users/signup-view/signup-view.component';
import { LoginViewComponent } from './users/login-view/login-view.component';
import { PasswordResetViewComponent } from './users/password-reset-view/password-reset-view.component';
import { PasswordResetConfirmViewComponent } from './users/password-reset-confirm-view/password-reset-confirm-view.component';
import { BoardsViewComponent } from './boards/boards-view/boards-view.component';
import { BoardDetailsComponent } from './boards/board-details/board-details.component';
import { AuthGuard } from './users/auth.guard';
import { AnnonGuard } from './users/annon.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'signup', component: SignupViewComponent, canActivate: [AnnonGuard] },
  { path: 'login', component: LoginViewComponent, canActivate: [AnnonGuard] },
  {
    path: 'forgot-password',
    component: PasswordResetViewComponent,
    canActivate: [AnnonGuard]
  },
  {
    path: 'reset-password/:uid/:token',
    component: PasswordResetConfirmViewComponent,
    canActivate: [AnnonGuard]
  },
  { path: 'boards', component: BoardsViewComponent, canActivate: [AuthGuard] },
  {
    path: 'boards/:boardPK',
    component: BoardDetailsComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
