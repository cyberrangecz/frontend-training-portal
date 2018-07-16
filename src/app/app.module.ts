import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AppRoutingModule} from "./app-routing.module";
import {ActiveUserService} from "./services/active-user.service";
import {AuthGuard} from "./guards/auth-guard.service";
import {LoginGuard} from "./guards/login-guard.service";
import {DesignerGuard} from "./guards/designer-guard.service";
import {OrganizerGuard} from "./guards/organizer-guard.service";
import {TraineeGuard} from "./guards/trainee-guard.service";
import {HttpClientModule} from "@angular/common/http";
import { NotFoundComponent } from './components/not-found/not-found.component';
import {UserLoaderService} from "./services/data-loaders/user-loader.service";

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    AuthGuard,
    LoginGuard,
    DesignerGuard,
    OrganizerGuard,
    TraineeGuard,
    ActiveUserService,
    UserLoaderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
