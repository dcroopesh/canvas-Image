import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasDialogComponent } from './canvas-dialog.component';

describe('CanvasDialogComponent', () => {
  let component: CanvasDialogComponent;
  let fixture: ComponentFixture<CanvasDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanvasDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
