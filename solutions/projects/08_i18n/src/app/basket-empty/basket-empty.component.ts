import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-basket-empty',
  standalone: true,
  templateUrl: './basket-empty.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasketEmptyComponent {}
