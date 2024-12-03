import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignLanguageGameComponent } from './sign-language-game.component';

describe('SignLanguageGameComponent', () => {
  let component: SignLanguageGameComponent;
  let fixture: ComponentFixture<SignLanguageGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignLanguageGameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignLanguageGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
