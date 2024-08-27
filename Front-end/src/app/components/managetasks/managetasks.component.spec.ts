import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagetasksComponent } from './managetasks.component';

describe('ManagetasksComponent', () => {
  let component: ManagetasksComponent;
  let fixture: ComponentFixture<ManagetasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagetasksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagetasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
