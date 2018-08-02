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
import {UserGetterService} from "./services/data-getters/user-getter.service";
import {SharedModule} from "./components/shared/shared.module";
import {SharedMaterialModule} from "./components/shared/shared-material.module";
import {TrainingDistractionFreeModeService} from "./services/training-distraction-free-mode.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    SharedMaterialModule
  ],
  providers: [
    AuthGuard,
    LoginGuard,
    DesignerGuard,
    OrganizerGuard,
    TraineeGuard,
    ActiveUserService,
    UserGetterService,
    TrainingDistractionFreeModeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
