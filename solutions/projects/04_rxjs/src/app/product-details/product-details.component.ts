import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '../alert/alert.service';
import { Product } from '../catalog/product/product.types';
import { ApiService } from '../shared/services/api.service';
import { PRODUCT_DETAILS_PARAM_KEY } from './product-details.config';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailsComponent implements OnInit {
  protected product?: Product;

  #apiService = inject(ApiService);

  #alertService = inject(AlertService);

  #activatedRoute = inject(ActivatedRoute);

  #changeDetectorRef = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.#apiService.getProduct(this.#activatedRoute.snapshot.params[PRODUCT_DETAILS_PARAM_KEY]).subscribe({
      next: (product) => {
        this.product = product;
        this.#changeDetectorRef.markForCheck();
      },
      error: () => this.#alertService.addDanger('😳 Désolé, ce produit est introuvable.'),
    });
  }
}
