import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IllustrationDetailComponent } from './illustration-detail.component';

describe('IllustrationDetailComponent', () => {
  let component: IllustrationDetailComponent;
  let fixture: ComponentFixture<IllustrationDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IllustrationDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IllustrationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
