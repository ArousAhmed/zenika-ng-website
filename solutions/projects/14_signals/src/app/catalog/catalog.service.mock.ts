import { computed, signal } from '@angular/core';
import { of } from 'rxjs';
import { CatalogService } from './catalog.service';
import { Product } from './product/product.types';

const products = signal<Product[]>([
  { id: 'id', title: 'title', description: 'description', photo: 'photo', price: 10, stock: 2 },
]);

export const MockCatalogService: Partial<CatalogService> = {
  products,

  isStockEmpty: computed(() => products().every(({ stock }) => stock === 0)),

  fetch: jasmine
    .createSpy('fetch')
    .and.returnValue(
      of([{ id: 'id', title: 'title', description: 'description', photo: 'photo', price: 10, stock: 2 }] as Product[]),
    ),

  decreaseStock: jasmine.createSpy('decreaseStock'),

  isAvailable: jasmine.createSpy('isAvailable').and.returnValue(true),
};
