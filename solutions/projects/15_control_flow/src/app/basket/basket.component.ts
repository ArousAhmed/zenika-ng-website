import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Customer } from '../customer/customer.types';
import { BasketFormComponent } from './basket-form/basket-form.component';
import { BasketService } from './basket.service';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, BasketFormComponent],
  templateUrl: './basket.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasketComponent {
  protected customer: Customer = { name: '', address: '', creditCard: '' };

  #basketService = inject(BasketService);

  protected items$ = this.#basketService.items$;

  protected numberOfItems$ = this.#basketService.numberOfItems$;

  protected total$ = this.#basketService.total$;
}
