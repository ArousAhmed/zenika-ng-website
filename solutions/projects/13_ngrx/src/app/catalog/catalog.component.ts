import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AlertService } from '../alert/alert.service';
import { WELCOME_MSG } from '../app.provider';
import { basketActions, selectBasket, selectCatalog } from '../shared/store';
import { isProductAvailable } from './catalog.utils';
import { ProductComponent } from './product/product.component';
import { Product } from './product/product.types';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, NgFor, NgIf, RouterLink, ProductComponent],
  templateUrl: './catalog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogComponent {
  protected welcomeMsg = inject(WELCOME_MSG);

  #store = inject(Store);

  #actions$ = inject(Actions);

  #alertService = inject(AlertService);

  protected total$ = this.#store.select(selectBasket.total);

  protected products$ = this.#store.select(selectCatalog.products);

  protected isStockEmpty$ = this.#store.select(selectCatalog.isStockEmpty);

  constructor() {
    this.#actions$
      .pipe(ofType(basketActions.addItemFailure), takeUntilDestroyed())
      .subscribe(() => this.#alertService.addDanger("😱 Désolé, impossible d'ajouter au panier."));
  }

  protected isAvailable(product: Product) {
    return isProductAvailable(product);
  }

  protected addToBasket(product: Product): void {
    this.#store.dispatch(basketActions.addItem({ productId: product.id }));
  }
}
