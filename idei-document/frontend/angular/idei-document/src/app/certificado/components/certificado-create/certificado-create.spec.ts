import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificadoCreate } from './certificado-create';

describe('CertificadoCreate', () => {
  let component: CertificadoCreate;
  let fixture: ComponentFixture<CertificadoCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CertificadoCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertificadoCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
