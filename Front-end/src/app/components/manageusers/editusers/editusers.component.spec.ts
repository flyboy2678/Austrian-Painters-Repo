import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditusersComponent } from './editusers.component';

describe('EditusersComponent', () => {
  let component: EditusersComponent;
  let fixture: ComponentFixture<EditusersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditusersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
