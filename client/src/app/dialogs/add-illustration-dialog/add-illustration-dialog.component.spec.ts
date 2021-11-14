import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIllustrationDialogComponent } from './add-illustration-dialog.component';

describe('AddIllustrationDialogComponent', () => {
  let component: AddIllustrationDialogComponent;
  let fixture: ComponentFixture<AddIllustrationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddIllustrationDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddIllustrationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
