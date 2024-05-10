import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaHomeComponent } from './empresa-home.component';

describe('CategoriesHomeComponent', () => {
  let component: EmpresaHomeComponent;
  let fixture: ComponentFixture<EmpresaHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmpresaHomeComponent]
    });
    fixture = TestBed.createComponent(EmpresaHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
