import { TestBed } from '@angular/core/testing';

import { EmpresaService } from './empresa.service';

describe('CategoriesService', () => {
  let service: EmpresaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpresaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
