import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductComponent } from './product.component';
import { Product } from './product.types';

// NOTE :
// The use of a wrapper component allows us to overcome the limitation of `OnPush` components
// when it comes to calling the `detectChanges` method more than once.

@Component({
  selector: 'app-wrap-product',
  standalone: true,
  imports: [ProductComponent],
  template: `<app-product [product]="product"></app-product>`,
})
export class WrapProductComponent {
  product: Product = { id: 'id', title: 'title', description: 'description', photo: 'photo', price: 10, stock: 2 };
}

describe('WrapProductComponent', () => {
  let wrapComponent: WrapProductComponent;
  let wrapFixture: ComponentFixture<WrapProductComponent>;

  let component: ProductComponent;
  let nativeElement: HTMLElement;

  beforeEach(() => {
    // Given
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, WrapProductComponent],
    });

    wrapFixture = TestBed.createComponent(WrapProductComponent);
    wrapComponent = wrapFixture.componentInstance;

    const debugElement = wrapFixture.debugElement.query(By.directive(ProductComponent));
    component = debugElement.componentInstance;
    nativeElement = debugElement.nativeElement as HTMLElement;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should work even when calling "detectChanges" more than once, thanks to "wrap" component', () => {
    // Given
    wrapFixture.detectChanges();
    expect(nativeElement.querySelector('[data-test="container"]')?.className).not.toContain('text-bg-warning');

    // When
    wrapComponent.product = { ...component.product, stock: 1 };
    wrapFixture.detectChanges(); // Great! Calling `detectChanges` more than once now works

    // Then
    expect(nativeElement.querySelector('[data-test="container"]')?.className).toContain('text-bg-warning');
  });
});
