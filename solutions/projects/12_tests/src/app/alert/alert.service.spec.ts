import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { AlertService } from './alert.service';

describe('AlertService', () => {
  let service: AlertService;

  beforeEach(() => {
    // Given
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add new alert on top', async () => {
    // When
    service.addSuccess('Success'); // first
    service.addDanger('Danger'); // second

    // Then
    expect(await firstValueFrom(service.alerts$)).toEqual([
      { type: 'danger', content: 'Danger' }, // second
      { type: 'success', content: 'Success' }, // first
    ]);
  });

  it('should remove alert after delay', fakeAsync(async () => {
    // Given
    service.addSuccess('Success');
    expect(await firstValueFrom(service.alerts$)).toHaveSize(1);

    // When
    tick(service.delay);

    // Then
    expect(await firstValueFrom(service.alerts$)).toHaveSize(0);
  }));

  it('should remove multiple alerts in FIFO order', fakeAsync(async () => {
    // Given
    service.addSuccess('Success');
    tick(service.delay / 2);
    service.addDanger('Danger');
    expect(await firstValueFrom(service.alerts$)).toEqual([
      { type: 'danger', content: 'Danger' },
      { type: 'success', content: 'Success' },
    ]);

    // When
    tick(service.delay / 2);
    // Then
    expect(await firstValueFrom(service.alerts$)).toEqual([{ type: 'danger', content: 'Danger' }]);

    // When
    tick(service.delay / 2);
    // Then
    expect(await firstValueFrom(service.alerts$)).toEqual([]);
  }));
});
