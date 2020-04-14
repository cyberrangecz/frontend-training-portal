import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeModule} from './components/home/home.module';
import {ErrorLogInterceptor} from './services/http-interceptors/error-log-interceptor';
import {LoadingInterceptor} from './services/http-interceptors/loading-interceptor';
import {LoadingService} from './services/shared/loading.service';
import {CsirtMuLayout1Module} from 'csirt-mu-layout';
import {CsirtMuConfirmationDialogModule} from 'csirt-mu-common';
import {ErrorHandlerService} from './services/shared/error-handler.service';
import {NotificationService} from './services/shared/notification.service';
import {AuthModule} from './auth-module';
import {appConfigProvider} from './services/shared/config.provider';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    AuthModule,
    CsirtMuLayout1Module,
    CsirtMuConfirmationDialogModule,
    HomeModule,
    MatIconModule,
    MatButtonModule,
  ],
  providers: [
    LoadingService,
    NotificationService,
    ErrorHandlerService,
    appConfigProvider,
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorLogInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
/**
 * Main app module. Contains global providers and module imports.
 */
export class AppModule {
}
