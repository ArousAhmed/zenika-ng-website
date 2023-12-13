import { Component, inject } from '@angular/core';
import { BasketService } from '../basket/basket.service';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    standalone: true,
    imports: [RouterLink, NgIf],
})
export class MenuComponent {
  private basketService = inject(BasketService);

  protected get numberOfItems() {
    return this.basketService.numberOfItems;
  }
}
