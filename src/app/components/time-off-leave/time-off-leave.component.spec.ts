import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeOffLeaveComponent } from './time-off-leave.component';

describe('TimeOffLeaveComponent', () => {
  let component: TimeOffLeaveComponent;
  let fixture: ComponentFixture<TimeOffLeaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeOffLeaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeOffLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
