import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Castvote } from './castvote';

describe('Castvote', () => {
  let component: Castvote;
  let fixture: ComponentFixture<Castvote>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Castvote]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Castvote);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
