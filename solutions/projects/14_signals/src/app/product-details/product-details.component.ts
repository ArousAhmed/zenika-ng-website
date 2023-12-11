import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Product } from '../catalog/product/product.types';
import { ProductDetailsComponentInputs } from './product-details.types';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './product-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailsComponent implements ProductDetailsComponentInputs {
  @Input({ required: true }) product!: Product;
}
