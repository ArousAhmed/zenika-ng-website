import { Routes } from '@angular/router';
import { basketGuard } from './basket/basket.guard';
import { catalogResolver } from './catalog/catalog.resolver';
import { PRODUCT_DETAILS_PARAM_KEY } from './product-details/product-details.config';
import { productDetailsResolveMap } from './product-details/product-details.resolver';

export const appRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./catalog/catalog.component').then((m) => m.CatalogComponent),
    resolve: { _: catalogResolver },
  },
  {
    path: 'basket',
    loadComponent: () => import('./basket/basket.component').then((m) => m.BasketComponent),
    canMatch: [basketGuard],
  },
  {
    path: 'basket',
    loadComponent: () => import('./basket-empty/basket-empty.component').then((m) => m.BasketEmptyComponent),
  },
  {
    path: `products/:${PRODUCT_DETAILS_PARAM_KEY}`,
    loadComponent: () => import('./product-details/product-details.component').then((m) => m.ProductDetailsComponent),
    resolve: productDetailsResolveMap,
  },
  {
    path: '**',
    loadComponent: () => import('./not-found/not-found.component').then((m) => m.NotFoundComponent),
  },
];
