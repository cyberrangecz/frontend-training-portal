import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SentinelLayout1Module } from '@sentinel/layout';
import { SentinelConfirmationDialogModule } from '@sentinel/components/dialogs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth.module';
import { HomeModule } from './components/home/home.module';
import { LoginModule } from './components/login/login.module';
import { ErrorLogInterceptor } from './services/http-interceptors/error-log-interceptor';
import { LoadingInterceptor } from './services/http-interceptors/loading-interceptor';
import { appConfigProvider } from './services/shared/config.provider';
import { ErrorHandlerService } from './services/shared/error-handler.service';
import { LoadingService } from './services/shared/loading.service';
import { NotificationService } from './services/shared/notification.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    AuthModule,
    LoginModule,
    SentinelLayout1Module,
    SentinelConfirmationDialogModule,
    HomeModule,
  ],
  providers: [
    LoadingService,
    NotificationService,
    ErrorHandlerService,
    appConfigProvider,
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorLogInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
/**
 * Main app module. Contains global providers and module imports.
 */
export class AppModule {}
