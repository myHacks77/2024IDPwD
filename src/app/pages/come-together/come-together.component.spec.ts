import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComeTogetherComponent } from './come-together.component';

describe('ComeTogetherComponent', () => {
  let component: ComeTogetherComponent;
  let fixture: ComponentFixture<ComeTogetherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComeTogetherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComeTogetherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
