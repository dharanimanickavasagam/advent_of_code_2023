import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day4ScratchCardsComponent } from './day4-scratch-cards.component';

describe('Day4ScratchCardsComponent', () => {
  let component: Day4ScratchCardsComponent;
  let fixture: ComponentFixture<Day4ScratchCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Day4ScratchCardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Day4ScratchCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
