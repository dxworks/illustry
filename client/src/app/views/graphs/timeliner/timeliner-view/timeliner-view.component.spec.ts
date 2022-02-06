import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelinerViewComponent } from './timeliner-view.component';

describe('TimelinerViewComponent', () => {
  let component: TimelinerViewComponent;
  let fixture: ComponentFixture<TimelinerViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimelinerViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelinerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
