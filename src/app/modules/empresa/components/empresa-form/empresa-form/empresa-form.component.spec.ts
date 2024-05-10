import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaFormComponent } from './empresa-form.component';

describe('CategoryFormComponent', () => {
  let component: EmpresaFormComponent;
  let fixture: ComponentFixture<EmpresaFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmpresaFormComponent]
    });
    fixture = TestBed.createComponent(EmpresaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
