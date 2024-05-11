import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteHomeComponent } from './pedido_produto.component';

describe('ProductsHomeComponent', () => {
  let component: ClienteHomeComponent;
  let fixture: ComponentFixture<ClienteHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClienteHomeComponent]
    });
    fixture = TestBed.createComponent(ClienteHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
