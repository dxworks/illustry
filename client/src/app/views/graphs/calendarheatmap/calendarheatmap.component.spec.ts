import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarheatmapComponent } from './calendarheatmap.component';

describe('CalendarheatmapComponent', () => {
  let component: CalendarheatmapComponent;
  let fixture: ComponentFixture<CalendarheatmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarheatmapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarheatmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
