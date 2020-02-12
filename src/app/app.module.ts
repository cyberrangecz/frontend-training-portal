import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Kypo2AuthInterceptor, Kypo2AuthModule} from 'kypo2-auth';
import {environment} from '../environments/environment';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeModule} from './components/home/home.module';
import {SharedModule} from './components/shared/shared.module';
import {AdminGuard} from './services/guards/admin-guard.service';
import {DesignerGuard} from './services/guards/designer-guard.service';
import {NotOnlyTraineeGuard} from './services/guards/only-trainee.guard.service';
import {OrganizerGuard} from './services/guards/organizer-guard.service';
import {TraineeGuard} from './services/guards/trainee-guard.service';
import {ErrorLogInterceptor} from './services/http-interceptors/error-log-interceptor';
import {LoadingInterceptor} from './services/http-interceptors/loading-interceptor';
import {DistractionFreeModeService} from './services/shared/distraction-free-mode.service';
import {LoadingService} from './services/shared/loading.service';
import {UserApi} from './services/api/user-api.service';
import {CsirtMuLayout1Module} from 'csirt-mu-layout';

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
    CsirtMuLayout1Module,
    HomeModule,
    Kypo2AuthModule.forRoot(environment.kypo2AuthConfig),
    MatIconModule,
    MatButtonModule,
  ],
  providers: [
    UserApi,
    DesignerGuard,
    OrganizerGuard,
    AdminGuard,
    TraineeGuard,
    NotOnlyTraineeGuard,
    DistractionFreeModeService,
    LoadingService,
    { provide: HTTP_INTERCEPTORS, useClass: Kypo2AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorLogInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
/**
 * Main app module. Contains global providers and module imports.
 */
export class AppModule { }
