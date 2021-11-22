import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteIllustrationDialogComponent } from './delete-illustration-dialog.component';

describe('DeleteIllustrationDialogComponent', () => {
  let component: DeleteIllustrationDialogComponent;
  let fixture: ComponentFixture<DeleteIllustrationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteIllustrationDialogComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteIllustrationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
