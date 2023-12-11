import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../customer/customer.types';
import { ApiService } from '../shared/services/api.service';
import { BasketItem } from './basket.types';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
})
export class BasketComponent {
  protected basketItems: BasketItem[] = [];

  protected customer: Customer = { name: '', address: '', creditCard: '' };

  constructor(
    private apiService: ApiService,
    private router: Router,
  ) {
    this.apiService.getBasket().subscribe((basketItems) => (this.basketItems = basketItems));
  }

  protected get basketTotal(): number {
    return this.basketItems.reduce((total, { price }) => total + price, 0);
  }

  protected checkout(event: Event): void {
    event.stopPropagation();
    event.preventDefault();

    this.apiService.checkoutBasket(this.customer).subscribe(() => {
      this.basketItems = [];
      this.router.navigate(['']);
    });
  }
}
