import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpollComponent } from './addpoll.component';

describe('AddpollComponent', () => {
  let component: AddpollComponent;
  let fixture: ComponentFixture<AddpollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddpollComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddpollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
