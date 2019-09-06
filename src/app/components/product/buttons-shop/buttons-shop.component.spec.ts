import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonsShopComponent } from './buttons-shop.component';

describe('ButtonsShopComponent', () => {
  let component: ButtonsShopComponent;
  let fixture: ComponentFixture<ButtonsShopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonsShopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonsShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
