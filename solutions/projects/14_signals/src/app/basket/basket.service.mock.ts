import { computed, signal } from '@angular/core';
import { of } from 'rxjs';
import { BasketService } from './basket.service';
import { BasketItem } from './basket.types';

const items = signal<BasketItem[]>([]);

export const MockBasketService: Partial<BasketService> = {
  items,

  total: computed(() => items().reduce((total, { price }) => total + price, 0)),

  numberOfItems: computed(() => items().length),

  fetch: jasmine.createSpy('fetch').and.returnValue(of([] as BasketItem[])),

  addItem: jasmine.createSpy('addItem').and.returnValue(of({ id: 'id', title: 'title', price: 10 } as BasketItem)),

  checkout: jasmine.createSpy('checkout').and.returnValue(of({ orderNumber: 1 })),
};
