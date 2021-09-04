import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForceLayoutGraphComponent } from './force-layout-graph.component';

describe('ForceLayoutGraphComponent', () => {
  let component: ForceLayoutGraphComponent;
  let fixture: ComponentFixture<ForceLayoutGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForceLayoutGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForceLayoutGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
