import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoTableComponent } from './produto-table.component';

describe('ProductsTableComponent', () => {
  let component: ProdutoTableComponent;
  let fixture: ComponentFixture<ProdutoTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProdutoTableComponent]
    });
    fixture = TestBed.createComponent(ProdutoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
