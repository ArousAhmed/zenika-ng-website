import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from './product.types';
import { CurrencyPipe, NgIf, UpperCasePipe } from '@angular/common';
import { RouterLinkWithHref } from '@angular/router';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  standalone:true,
  imports:[NgIf,RouterLinkWithHref,CurrencyPipe,UpperCasePipe]
})
export class ProductComponent {
  @Input({ required: true }) product!: Product;

  @Output() addToBasket = new EventEmitter<Product>();

  protected onClick(): void {
    this.addToBasket.emit(this.product);
  }

  protected isTheLast(): boolean {
    return this.product.stock === 1;
  }
}
