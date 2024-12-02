import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandGesturesComponent } from './hand-gestures.component';

describe('HandGesturesComponent', () => {
  let component: HandGesturesComponent;
  let fixture: ComponentFixture<HandGesturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HandGesturesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HandGesturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
