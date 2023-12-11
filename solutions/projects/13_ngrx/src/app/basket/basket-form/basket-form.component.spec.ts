import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable } from 'rxjs';
import { AppState } from '../../shared/store';
import { BasketFormComponent } from './basket-form.component';

describe('BasketFormComponent', () => {
  let component: BasketFormComponent;
  let fixture: ComponentFixture<BasketFormComponent>;
  let actions$: Observable<Action>;

  beforeEach(() => {
    actions$ = new Observable<Action>();

    TestBed.configureTestingModule({
      imports: [BasketFormComponent],
      providers: [
        provideMockStore<AppState>({
          initialState: {
            catalog: { products: [] },
            basket: { items: [], customer: undefined },
          },
        }),
        provideMockActions(() => actions$),
      ],
    });

    fixture = TestBed.createComponent(BasketFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
