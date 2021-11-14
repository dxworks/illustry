import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateIllustrationDialogComponent } from './update-illustration-dialog.component';

describe('UpdateIllustrationDialogComponent', () => {
  let component: UpdateIllustrationDialogComponent;
  let fixture: ComponentFixture<UpdateIllustrationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateIllustrationDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateIllustrationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
