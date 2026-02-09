import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsociacionDialog } from './asociacion-dialog';

describe('AsociacionDialog', () => {
  let component: AsociacionDialog;
  let fixture: ComponentFixture<AsociacionDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsociacionDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsociacionDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
