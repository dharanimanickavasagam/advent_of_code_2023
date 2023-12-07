import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day3GearRatiosComponent } from './day3-gear-ratios.component';

describe('Day3GearRatiosComponent', () => {
  let component: Day3GearRatiosComponent;
  let fixture: ComponentFixture<Day3GearRatiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Day3GearRatiosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Day3GearRatiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
