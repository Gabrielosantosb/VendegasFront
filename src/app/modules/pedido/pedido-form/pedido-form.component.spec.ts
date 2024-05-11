import { ComponentFixture, TestBed } from '@angular/core/testing';
import {PedidoProdutoFormComponent} from "../../pedido_produto/pedido_produto-form/pedido_produto-form.component";



describe('ProductFormComponent', () => {
  let component: PedidoProdutoFormComponent;
  let fixture: ComponentFixture<PedidoProdutoFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PedidoProdutoFormComponent]
    });
    fixture = TestBed.createComponent(PedidoProdutoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
