import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Generador } from './generador';

describe('Generador', () => {
  let component: Generador;
  let fixture: ComponentFixture<Generador>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Generador]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Generador);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
