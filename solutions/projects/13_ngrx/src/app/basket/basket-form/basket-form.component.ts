import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, first } from 'rxjs';
import { AlertService } from '../../alert/alert.service';
import { Customer } from '../../customer/customer.types';
import { basketActions, selectBasket } from '../../shared/store';

@Component({
  selector: 'app-basket-form',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './basket-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasketFormComponent {
  #fb = inject(FormBuilder);

  #store = inject(Store);

  #actions$ = inject(Actions);

  #alertService = inject(AlertService);

  #router = inject(Router);

  #changeDetectorRef = inject(ChangeDetectorRef);

  protected formGroup = this.#fb.group({
    name: this.#fb.nonNullable.control('', [Validators.required]),
    address: this.#fb.nonNullable.control('', [Validators.required]),
    creditCard: this.#fb.nonNullable.control('', [Validators.required, Validators.pattern(/^\d{3}-\d{3}$/)]),
  });

  constructor() {
    this.#actions$.pipe(ofType(basketActions.checkoutSuccess), takeUntilDestroyed()).subscribe(({ orderNumber }) => {
      this.#alertService.addSuccess(`🚀 Merci pour votre commande (réf. ${orderNumber}).`);
      this.#router.navigate(['']);
    });

    this.#actions$.pipe(ofType(basketActions.checkoutFailure), takeUntilDestroyed()).subscribe(() => {
      this.#alertService.addDanger('😱 Désolé, impossible de valider votre commande.');
      this.formGroup.enable();
      this.#changeDetectorRef.markForCheck();
    });

    this.#store
      .select(selectBasket.customer)
      .pipe(
        first(),
        filter((customer): customer is Customer => customer !== undefined),
      )
      .subscribe((customer) => {
        this.formGroup.setValue(customer);
        this.formGroup.updateValueAndValidity();
      });
  }

  protected checkout() {
    this.formGroup.disable();
    this.#store.dispatch(basketActions.fillCustomer({ customer: this.formGroup.value as Customer }));
    this.#store.dispatch(basketActions.checkout());
  }
}
