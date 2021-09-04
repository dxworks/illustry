import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HiearchicalEdgeBundlingComponent } from './hiearchical-edge-bundling.component';

describe('HiearchicalEdgeBundlingComponent', () => {
  let component: HiearchicalEdgeBundlingComponent;
  let fixture: ComponentFixture<HiearchicalEdgeBundlingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HiearchicalEdgeBundlingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HiearchicalEdgeBundlingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
