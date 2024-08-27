import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageusersComponent } from './manageusers.component';

describe('ManageusersComponent', () => {
  let component: ManageusersComponent;
  let fixture: ComponentFixture<ManageusersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageusersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
