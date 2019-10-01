import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {DesignerGuard} from './services/guards/designer-guard.service';
import {OrganizerGuard} from './services/guards/organizer-guard.service';
import {TraineeGuard} from './services/guards/trainee-guard.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {SharedModule} from './components/shared/shared.module';
import {DistractionFreeModeService} from './services/shared/distraction-free-mode.service';
import {UserFacadeModule} from './services/facades/modules/user-facade.module';
import {AdminGuard} from './services/guards/admin-guard.service';
import {ErrorLogInterceptor} from './services/http-interceptors/error-log-interceptor';
import {NgxHotjarModule} from 'ngx-hotjar';
import {Kypo2AuthInterceptor, Kypo2AuthModule} from 'kypo2-auth';
import {environment} from '../environments/environment';
import {NotOnlyTraineeGuard} from './services/guards/only-trainee.guard.service';
import {LayoutModule} from './components/layout/layout.module';
import {MatButtonModule, MatIconModule} from '@angular/material';
import {LoadingService} from './services/shared/loading.service';
import {LoadingInterceptor} from './services/http-interceptors/loading-interceptor';
import {HomeModule} from './components/home/home.module';

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
    LayoutModule,
    HomeModule,
    UserFacadeModule,
    Kypo2AuthModule.forRoot(environment.kypo2AuthConfig),
    environment.useHotjar ? NgxHotjarModule.forRoot(environment.hotjarTrackingCode) : [],
    MatIconModule,
    MatButtonModule,
  ],
  providers: [
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
export class AppModule { }
