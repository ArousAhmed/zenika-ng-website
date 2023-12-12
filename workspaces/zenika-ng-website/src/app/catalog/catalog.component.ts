import { Component, inject,Inject } from '@angular/core';
import { Product } from '../product/product.types';
import { ApiService } from '../shared/services/api.service';
import { BasketService } from '../basket/basket.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
})
export class CatalogComponent {
  private basketService = inject(BasketService);

  protected products: Product[] = [];

  // private basketItems: BasketItem[] = [];

  constructor(
    @Inject('WELCOME_MSG') protected welcomeMsg: string,
    private apiService: ApiService,
  ) {
    this.basketService.fetch().subscribe();
    // this.apiService.getProducts().subscribe((products) => (this.products = products));
    // this.apiService.getBasket().subscribe((basketItems) => (this.basketItems = basketItems));
  }

  protected get basketTotal(): number {
    return this.basketService.total;
  }

  protected addToBasket(product: Product): void {
    this.basketService.addItem(product.id).subscribe(() => {
      this.decreaseStock(product);
    });
  }

  private decreaseStock(product: Product): void {
    product.stock -= 1;
  }

  protected isAvailable(product: Product): boolean {
    return product.stock !== 0;
  }

  protected get isStockEmpty(): boolean {
    return this.products.every(({ stock }) => stock === 0);
  }
}
