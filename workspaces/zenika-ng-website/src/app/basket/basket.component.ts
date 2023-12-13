import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../customer/customer.types';
import { BasketService } from './basket.service';
import { NgFor, NgIf, CurrencyPipe } from '@angular/common';

@Component({
    selector: 'app-basket',
    templateUrl: './basket.component.html',
    standalone: true,
    imports: [
        NgFor,
        NgIf,
        CurrencyPipe,
    ],
})
export class BasketComponent implements OnInit {
  protected customer: Customer = { name: '', address: '', creditCard: '' };

  private basketService = inject(BasketService);

  private router = inject(Router);

  protected get items() {
    return this.basketService.items;
  }

  protected get total() {
    return this.basketService.total;
  }

  ngOnInit(): void {
    this.basketService.fetch().subscribe();
  }

  protected checkout(event: Event): void {
    event.stopPropagation();
    event.preventDefault();

    this.basketService.checkout(this.customer).subscribe(() => this.router.navigate(['']));
  }
}
