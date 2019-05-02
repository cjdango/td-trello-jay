import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SortablejsModule } from 'angular-sortablejs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersModule } from './users/users.module';
import { BoardsModule } from './boards/boards.module';
import { MatModule } from './mat.module';
import { BaseURLInterceptor } from './base-url.interceptor';
import { HttpHeaderInterceptor } from './http-header.interceptor';
import { AlertComponent } from './components/alert/alert.component';

@NgModule({
  declarations: [AppComponent, AlertComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    UsersModule,
    BoardsModule,
    SortablejsModule.forRoot({ animation: 150, ghostClass: 'drop-placeholder' })
  ],
  exports: [MatModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BaseURLInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpHeaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
