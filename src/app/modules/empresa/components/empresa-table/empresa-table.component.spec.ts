import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaTableComponent } from './empresa-table.component';

describe('CategoriesTableComponent', () => {
  let component: EmpresaTableComponent;
  let fixture: ComponentFixture<EmpresaTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmpresaTableComponent]
    });
    fixture = TestBed.createComponent(EmpresaTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
