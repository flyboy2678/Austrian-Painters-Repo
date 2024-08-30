import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomCalComponent } from './custom-cal.component';

describe('CustomCalComponent', () => {
  let component: CustomCalComponent;
  let fixture: ComponentFixture<CustomCalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomCalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomCalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
