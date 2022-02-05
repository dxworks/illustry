import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelinerComponent } from './timeliner.component';

describe('TimelinerComponent', () => {
  let component: TimelinerComponent;
  let fixture: ComponentFixture<TimelinerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimelinerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelinerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
