import { inject } from '@angular/core';
import { catchError, EMPTY, map } from 'rxjs';
import { AlertService } from '../alert/alert.service';
import { BasketService } from './basket.service';

export const basketGuard = () => {
  const alertService = inject(AlertService);
  return inject(BasketService)
    .fetch()
    .pipe(
      map(({ length }) => length > 0),
      catchError(() => {
        alertService.addDanger($localize`:@@Response.UnableToAccessBasket:😖 Désolé, impossible d'accéder au panier.`);
        return EMPTY;
      }),
    );
};
