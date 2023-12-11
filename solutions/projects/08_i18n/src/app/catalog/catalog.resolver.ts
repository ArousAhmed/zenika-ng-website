import { inject } from '@angular/core';
import { catchError, EMPTY, zip } from 'rxjs';
import { AlertService } from '../alert/alert.service';
import { BasketService } from '../basket/basket.service';
import { CatalogService } from './catalog.service';

export const catalogResolver = () => {
  const alertService = inject(AlertService);
  return zip([inject(CatalogService).fetch(), inject(BasketService).fetch()]).pipe(
    catchError(() => {
      alertService.addDanger(
        $localize`:@@Response.UnableToAccessCatalog:😲 Désolé, impossible d'accéder au catalogue.`,
      );
      return EMPTY;
    }),
  );
};
