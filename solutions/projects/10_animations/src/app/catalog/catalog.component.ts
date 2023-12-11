import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AlertService } from '../alert/alert.service';
import { WELCOME_MSG } from '../app.provider';
import { BasketService } from '../basket/basket.service';
import { catalogAnimations } from './catalog.animation';
import { CatalogService } from './catalog.service';
import { ProductComponent } from './product/product.component';
import { Product } from './product/product.types';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, NgFor, NgIf, RouterLink, ProductComponent],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  animations: [catalogAnimations],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogComponent {
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

  protected addToBasket(product: Product): void {
    this.#basketService.addItem(product.id).subscribe({
      next: () => this.#catalogService.decreaseStock(product.id),
      error: () => this.#alertService.addDanger("😱 Désolé, une erreur s'est produite."),
    });
  }

  // Note: the animation will not work properly without the `ngForTrackBy` directive
  protected trackById(_: number, { id }: Product) {
    return id;
  }
}
