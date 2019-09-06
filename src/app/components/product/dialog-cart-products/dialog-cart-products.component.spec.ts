import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCartProductsComponent } from './dialog-cart-products.component';

describe('DialogCartProductsComponent', () => {
  let component: DialogCartProductsComponent;
  let fixture: ComponentFixture<DialogCartProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCartProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCartProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
