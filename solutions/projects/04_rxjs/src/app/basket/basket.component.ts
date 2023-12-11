import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, EMPTY } from 'rxjs';
import { AlertService } from '../alert/alert.service';
import { Customer } from '../customer/customer.types';
import { BasketService } from './basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasketComponent implements OnInit {
  protected customer: Customer = { name: '', address: '', creditCard: '' };

  #basketService = inject(BasketService);

  #alertService = inject(AlertService);

  #router = inject(Router);

  protected items$ = this.#basketService.items$;

  protected numberOfItems$ = this.#basketService.numberOfItems$;

  protected total$ = this.#basketService.total$;

  ngOnInit(): void {
    this.#basketService
      .fetch()
      .pipe(
        catchError(() => {
          this.#alertService.addDanger("😖 Désolé, impossible d'accéder au panier.");
          return EMPTY;
        }),
      )
      .subscribe();
  }

  protected checkout(event: Event): void {
    event.stopPropagation();
    event.preventDefault();

    this.#basketService.checkout(this.customer).subscribe({
      next: ({ orderNumber }) => {
        this.#alertService.addSuccess(`🚀 Merci pour votre commande (réf. ${orderNumber}).`);
        this.#router.navigate(['']);
      },
      error: () => {
        this.#alertService.addDanger("😱 Désolé, une erreur s'est produite.");
      },
    });
  }
}
