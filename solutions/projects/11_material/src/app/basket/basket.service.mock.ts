import { of } from 'rxjs';
import { BasketService } from './basket.service';
import { BasketItem } from './basket.types';

export const MockBasketService: Partial<BasketService> = {
  items$: of([] as BasketItem[]),

  total$: of(0),

  numberOfItems$: of(0),

  fetch: jasmine.createSpy('fetch').and.returnValue(of([] as BasketItem[])),

  addItem: jasmine.createSpy('addItem').and.returnValue(of({ id: 'id', title: 'title', price: 10 } as BasketItem)),

  checkout: jasmine.createSpy('checkout').and.returnValue(of({ orderNumber: 1 })),
};
