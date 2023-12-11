import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectBasket } from '../shared/store';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [AsyncPipe, NgIf, RouterLink],
  templateUrl: './menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
  protected numberOfItems$ = inject(Store).select(selectBasket.numberOfItems);
}
