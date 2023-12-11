import { InjectionToken, ValueProvider } from '@angular/core';

export const WELCOME_MSG = new InjectionToken<string>('WELCOME_MSG');

export const provideWelcomeMsg: () => ValueProvider = () => ({
  provide: WELCOME_MSG,
  useValue: 'Bienvenue sur Zenika Ecommerce',
});
