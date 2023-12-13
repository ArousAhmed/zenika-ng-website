import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app/app-routing.module';
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { WELCOME_MSG } from './app/app.token';

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, AppRoutingModule),
        {
            provide: WELCOME_MSG,
            useValue: 'Bienvenue sur Zenika Ecommerce',
        },
        provideHttpClient(withInterceptorsFromDi()),
    ]
})
  .catch((err) => console.error(err));
