import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificadoEdit } from './certificado-edit';

describe('CertificadoEdit', () => {
  let component: CertificadoEdit;
  let fixture: ComponentFixture<CertificadoEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CertificadoEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertificadoEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
