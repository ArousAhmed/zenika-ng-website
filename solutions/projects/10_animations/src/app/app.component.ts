import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { BehaviorSubject, filter } from 'rxjs';
import { AlertComponent } from './alert/alert.component';
import { appAnimations } from './app.animations';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AsyncPipe, RouterOutlet, AlertComponent, FooterComponent, MenuComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [appAnimations],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  protected increment$ = new BehaviorSubject(0);

  constructor() {
    inject(Router)
      .events.pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.increment$.next(this.increment$.value + 1));
  }
}
