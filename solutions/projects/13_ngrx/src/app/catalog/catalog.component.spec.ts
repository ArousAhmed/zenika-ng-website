import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable } from 'rxjs';
import { WELCOME_MSG } from '../app.provider';
import { AppState } from '../shared/store';
import { CatalogComponent } from './catalog.component';

describe('CatalogComponent', () => {
  let component: CatalogComponent;
  let fixture: ComponentFixture<CatalogComponent>;
  let actions$: Observable<Action>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CatalogComponent, RouterTestingModule],
      providers: [
        provideMockStore<AppState>({
          initialState: {
            catalog: { products: [] },
            basket: { items: [], customer: undefined },
          },
        }),
        provideMockActions(() => actions$),
        {
          provide: WELCOME_MSG,
          useValue: 'Welcome to unit testing',
        },
      ],
    });

    fixture = TestBed.createComponent(CatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
