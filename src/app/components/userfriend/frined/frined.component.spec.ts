import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrinedComponent } from './frined.component';

describe('FrinedComponent', () => {
  let component: FrinedComponent;
  let fixture: ComponentFixture<FrinedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrinedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrinedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
