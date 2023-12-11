import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { BasketService } from '../basket/basket.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [AsyncPipe, NgIf, RouterLink, MatBadgeModule, MatButtonModule, MatToolbarModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
  protected numberOfItems$ = inject(BasketService).numberOfItems$;
}
