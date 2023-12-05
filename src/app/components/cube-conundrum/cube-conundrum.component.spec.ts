import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CubeConundrumComponent } from './cube-conundrum.component';

describe('CubeConundrumComponent', () => {
  let component: CubeConundrumComponent;
  let fixture: ComponentFixture<CubeConundrumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CubeConundrumComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CubeConundrumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
