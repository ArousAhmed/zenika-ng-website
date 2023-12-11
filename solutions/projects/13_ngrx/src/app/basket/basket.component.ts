import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Customer } from '../customer/customer.types';
import { selectBasket } from '../shared/store';
import { BasketFormComponent } from './basket-form/basket-form.component';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, NgFor, NgIf, BasketFormComponent],
  templateUrl: './basket.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasketComponent {
  protected customer: Customer = { name: '', address: '', creditCard: '' };

  #store = inject(Store);

  protected basket$ = this.#store.select(selectBasket.items);

  protected numberOfItems$ = this.#store.select(selectBasket.numberOfItems);

  protected total$ = this.#store.select(selectBasket.total);
}
