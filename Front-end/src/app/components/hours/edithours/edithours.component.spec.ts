import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdithoursComponent } from './edithours.component';

describe('EdithoursComponent', () => {
  let component: EdithoursComponent;
  let fixture: ComponentFixture<EdithoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdithoursComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EdithoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
