import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteTableComponent } from './pedido_produto.component';

describe('ProductsTableComponent', () => {
  let component: ClienteTableComponent;
  let fixture: ComponentFixture<ClienteTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClienteTableComponent]
    });
    fixture = TestBed.createComponent(ClienteTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
