import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BasketService } from '../basket.service';
import { MockBasketService } from '../basket.service.mock';
import { BasketFormComponent } from './basket-form.component';

describe('BasketFormComponent', () => {
  let component: BasketFormComponent;
  let fixture: ComponentFixture<BasketFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, BasketFormComponent],
      providers: [
        {
          provide: BasketService,
          useValue: MockBasketService,
        },
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
