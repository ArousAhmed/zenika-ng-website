import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, catchError } from 'rxjs';
import { AlertService } from '../alert/alert.service';
import { ApiService } from '../shared/services/api.service';
import { PRODUCT_DETAILS_PARAM_KEY } from './product-details.config';
import { ProductDetailsResolveMap } from './product-details.types';

export const productDetailsResolveMap: ProductDetailsResolveMap = {
  product: ({ params }: ActivatedRouteSnapshot) => {
    const apiService = inject(ApiService);
    const alertService = inject(AlertService);
    const router = inject(Router);

    return apiService.getProduct(params[PRODUCT_DETAILS_PARAM_KEY]).pipe(
      catchError(() => {
        alertService.addDanger('😳 Désolé, ce produit est introuvable.');
        router.navigate(['/']);
        return EMPTY;
      }),
    );
  },
};
