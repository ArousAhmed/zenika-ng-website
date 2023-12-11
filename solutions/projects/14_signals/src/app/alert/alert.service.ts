import { Injectable, computed, signal } from '@angular/core';
import { Alert } from './alert.types';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  readonly delay = 3000;

  #alerts = signal<Alert[]>([]);

  alerts = computed(() => this.#alerts());

  addSuccess(content: string) {
    this.#add({ type: 'success', content });
  }

  addDanger(content: string) {
    this.#add({ type: 'danger', content });
  }

  #add(alert: Alert): void {
    this.#alerts.update((alerts) => [alert, ...alerts]);
    this.#scheduleRemoval();
  }

  #scheduleRemoval() {
    setTimeout(
      () => this.#alerts.update((alerts) => alerts.filter((_, index) => index !== alerts.length - 1)),
      this.delay,
    );
  }
}
