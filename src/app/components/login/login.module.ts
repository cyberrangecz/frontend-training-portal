import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { SentinelAuthProviderListModule } from '@sentinel/auth/components';
import { LoginComponent } from './login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, SentinelAuthProviderListModule, MatCardModule],
  exports: [LoginComponent],
})
export class LoginModule {}
