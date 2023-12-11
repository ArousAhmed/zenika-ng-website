import { AsyncPipe, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { alertAnimations } from './alert.animation';
import { AlertService } from './alert.service';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [AsyncPipe, NgFor],
  templateUrl: './alert.component.html',
  animations: [alertAnimations],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent {
  protected alerts$ = inject(AlertService).alerts$;
}
