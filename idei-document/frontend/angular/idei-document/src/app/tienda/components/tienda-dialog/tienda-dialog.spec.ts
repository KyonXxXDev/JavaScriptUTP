import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiendaDialog } from './tienda-dialog';

describe('TiendaDialog', () => {
  let component: TiendaDialog;
  let fixture: ComponentFixture<TiendaDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TiendaDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TiendaDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
