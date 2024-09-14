import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadhoursComponent } from './downloadhours.component';

describe('DownloadhoursComponent', () => {
  let component: DownloadhoursComponent;
  let fixture: ComponentFixture<DownloadhoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DownloadhoursComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadhoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
