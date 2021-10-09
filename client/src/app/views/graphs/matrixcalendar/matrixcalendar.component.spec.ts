import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixcalendarComponent } from './matrixcalendar.component';

describe('MatrixcalendarComponent', () => {
  let component: MatrixcalendarComponent;
  let fixture: ComponentFixture<MatrixcalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatrixcalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatrixcalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
