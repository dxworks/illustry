import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IllustrationItemComponent } from './illustration-item.component';

describe('IllustrationItemComponent', () => {
  let component: IllustrationItemComponent;
  let fixture: ComponentFixture<IllustrationItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IllustrationItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IllustrationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
