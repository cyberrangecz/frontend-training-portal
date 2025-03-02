import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SentinelConfirmationDialogComponent } from '@sentinel/components/dialogs';
import { SentinelLayout1Module } from '@sentinel/layout/layout1';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth.module';
import { HomeModule } from './components/home/home.module';
import { LoginModule } from './components/login/login.module';
import { ErrorLogInterceptor } from './services/http-interceptors/error-log-interceptor';
import { LoadingInterceptor } from './services/http-interceptors/loading-interceptor';
import { appConfigProvider } from '@sentinel/common/dynamic-env';
import { ErrorHandlerService } from './services/shared/error-handler.service';
import { LoadingService } from './services/shared/loading.service';
import { NotificationService } from './services/shared/notification.service';
import { TokenRefreshInterceptor } from './services/http-interceptors/token-refresh-interceptor';
import { TokenRefreshService } from './services/shared/token-refresh.service';

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
        SentinelConfirmationDialogComponent,
        HomeModule,
    ],
    providers: [
        LoadingService,
        NotificationService,
        ErrorHandlerService,
        TokenRefreshService,
        appConfigProvider,
        { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: TokenRefreshInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorLogInterceptor, multi: true },
    ],
    bootstrap: [AppComponent],
})
/**
 * Main app module. Contains global providers and module imports.
 */
export class AppModule {}
