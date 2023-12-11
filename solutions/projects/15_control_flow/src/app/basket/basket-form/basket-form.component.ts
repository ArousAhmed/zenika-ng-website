import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../../alert/alert.service';
import { Customer } from '../../customer/customer.types';
import { BasketService } from '../basket.service';

@Component({
  selector: 'app-basket-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './basket-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasketFormComponent {
  #fb = inject(FormBuilder);

  #basketService = inject(BasketService);

  #alertService = inject(AlertService);

  #router = inject(Router);

  #changeDetectorRef = inject(ChangeDetectorRef);

  protected formGroup = this.#fb.group({
    name: this.#fb.nonNullable.control('', [Validators.required]),
    address: this.#fb.nonNullable.control('', [Validators.required]),
    creditCard: this.#fb.nonNullable.control('', [Validators.required, Validators.pattern(/^\d{3}-\d{3}$/)]),
  });

  protected checkout() {
    this.formGroup.disable();

    this.#basketService.checkout(this.formGroup.value as Customer).subscribe({
      next: ({ orderNumber }) => {
        this.#alertService.addSuccess(`🚀 Merci pour votre commande (réf. ${orderNumber}).`);
        this.#router.navigate(['']);
      },
      error: () => {
        this.#alertService.addDanger("😱 Désolé, une erreur s'est produite.");
        this.formGroup.enable();
        this.#changeDetectorRef.markForCheck();
      },
    });
  }
}
