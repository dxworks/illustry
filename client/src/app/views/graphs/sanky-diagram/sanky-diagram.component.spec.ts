import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SankyDiagramComponent } from './sanky-diagram.component';

describe('SankyDiagramComponent', () => {
  let component: SankyDiagramComponent;
  let fixture: ComponentFixture<SankyDiagramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SankyDiagramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SankyDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
