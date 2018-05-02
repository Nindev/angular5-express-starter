import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { AppMaterialModule } from '../app-material.module';
import { AuthService } from './auth.service';
import { NotLoggedInGuardGuard } from './not-logged-in-guard.guard';

@NgModule({
    imports: [
        AppMaterialModule,
        FormsModule
    ],
    declarations: [
        LoginComponent
    ],
    exports: [
        LoginComponent
    ],
    providers: [
        AuthService,
        AuthGuard,
        NotLoggedInGuardGuard,
    ]
})
export class AuthModule { }
