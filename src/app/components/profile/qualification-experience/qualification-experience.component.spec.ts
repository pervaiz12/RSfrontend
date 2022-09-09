import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualificationExperienceComponent } from './qualification-experience.component';

describe('QualificationExperienceComponent', () => {
  let component: QualificationExperienceComponent;
  let fixture: ComponentFixture<QualificationExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QualificationExperienceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QualificationExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
