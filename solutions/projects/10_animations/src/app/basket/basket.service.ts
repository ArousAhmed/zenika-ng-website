import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Customer } from '../customer/customer.types';
import { ApiService } from '../shared/services/api.service';
import { BasketItem } from './basket.types';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  #items$ = new BehaviorSubject<BasketItem[]>([]);

  items$ = this.#items$.asObservable();

  total$: Observable<number> = this.#items$.pipe(
    map((basket) => basket.reduce((total, { price }) => total + price, 0)),
  );

  numberOfItems$: Observable<number> = this.#items$.pipe(map(({ length }) => length));

  #apiService = inject(ApiService);

  fetch(): Observable<BasketItem[]> {
    return this.#apiService.getBasket().pipe(tap((items) => this.#items$.next(items)));
  }

  addItem(productId: string): Observable<BasketItem> {
    return this.#apiService
      .addToBasket(productId)
      .pipe(tap((item) => this.#items$.next([...this.#items$.value, item])));
  }

  checkout(customer: Customer): Observable<{ orderNumber: number }> {
    return this.#apiService.checkoutBasket(customer).pipe(tap(() => this.#items$.next([])));
  }
}
