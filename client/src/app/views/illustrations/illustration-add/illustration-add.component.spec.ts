import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IllustrationAddComponent } from './illustration-add.component';

describe('IllustrationAddComponent', () => {
  let component: IllustrationAddComponent;
  let fixture: ComponentFixture<IllustrationAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IllustrationAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IllustrationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
