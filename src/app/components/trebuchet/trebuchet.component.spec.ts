import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrebuchetComponent } from './trebuchet.component';

describe('TrebuchetComponent', () => {
  let component: TrebuchetComponent;
  let fixture: ComponentFixture<TrebuchetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrebuchetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrebuchetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
