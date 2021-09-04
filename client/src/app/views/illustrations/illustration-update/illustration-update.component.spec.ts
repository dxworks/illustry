import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IllustrationUpdateComponent } from './illustration-update.component';

describe('IllustrationUpdateComponent', () => {
  let component: IllustrationUpdateComponent;
  let fixture: ComponentFixture<IllustrationUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IllustrationUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IllustrationUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
