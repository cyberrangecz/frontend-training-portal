import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AppRoutingModule} from "./app-routing.module";
import {ActiveUserService} from "./services/active-user.service";
import {AuthGuard} from "./guards/auth-guard.service";
import {DesignerGuard} from "./guards/designer-guard.service";
import {OrganizerGuard} from "./guards/organizer-guard.service";
import {TraineeGuard} from "./guards/trainee-guard.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {SharedModule} from "./components/shared/shared.module";
import {TrainingDistractionFreeModeService} from "./services/training-distraction-free-mode.service";
import {AuthInterceptor} from "./http-interceptors/auth-interceptor";
import {OAuthModule, OAuthStorage} from "angular-oauth2-oidc";
import {UserFacadeModule} from "./services/facades/modules/user-facade.module";
import {AdminGuard} from './guards/admin-guard.service';

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
    UserFacadeModule,
    OAuthModule.forRoot(
      {
        resourceServer: {
          allowedUrls: [],
          sendAccessToken: true
        }
      })
  ],
  providers: [
    { provide: OAuthStorage, useValue: localStorage },
    AuthGuard,
    DesignerGuard,
    OrganizerGuard,
    AdminGuard,
    TraineeGuard,
    ActiveUserService,
    TrainingDistractionFreeModeService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
