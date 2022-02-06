import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelinerSortComponent } from './timeliner-sort.component';

describe('TimelinerSortComponent', () => {
  let component: TimelinerSortComponent;
  let fixture: ComponentFixture<TimelinerSortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimelinerSortComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelinerSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
