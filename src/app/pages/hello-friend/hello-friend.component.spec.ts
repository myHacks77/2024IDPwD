import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelloFriendComponent } from './hello-friend.component';

describe('HelloFriendComponent', () => {
  let component: HelloFriendComponent;
  let fixture: ComponentFixture<HelloFriendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelloFriendComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelloFriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
