import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { catchError, EMPTY, zip } from 'rxjs';
import { AlertService } from '../alert/alert.service';
import { WELCOME_MSG } from '../app.token';
import { BasketService } from '../basket/basket.service';
import { CatalogService } from './catalog.service';
import { Product } from './product/product.types';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogComponent implements OnInit {
  protected welcomeMsg = inject(WELCOME_MSG);

  #basketService = inject(BasketService);

  #catalogService = inject(CatalogService);

  #alertService = inject(AlertService);

  protected total$ = this.#basketService.total$;

  protected products$ = this.#catalogService.products$;

  protected isStockEmpty$ = this.#catalogService.isStockEmpty$;

  protected isAvailable(product: Product) {
    return this.#catalogService.isAvailable(product);
  }

  ngOnInit(): void {
    zip([this.#catalogService.fetch(), this.#basketService.fetch()])
      .pipe(
        catchError(() => {
          this.#alertService.addDanger("😲 Désolé, impossible d'accéder au catalogue.");
          return EMPTY;
        }),
      )
      .subscribe();
  }

  protected addToBasket(product: Product): void {
    this.#basketService.addItem(product.id).subscribe({
      next: () => this.#catalogService.decreaseStock(product.id),
      error: () => this.#alertService.addDanger("😱 Désolé, une erreur s'est produite."),
    });
  }
}
