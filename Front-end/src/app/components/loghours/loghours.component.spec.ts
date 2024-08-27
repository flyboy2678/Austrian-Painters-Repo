import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoghoursComponent } from './loghours.component';

describe('LoghoursComponent', () => {
  let component: LoghoursComponent;
  let fixture: ComponentFixture<LoghoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoghoursComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoghoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
