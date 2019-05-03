import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveBoardFormComponent } from './archive-board-form.component';

describe('ArchiveBoardFormComponent', () => {
  let component: ArchiveBoardFormComponent;
  let fixture: ComponentFixture<ArchiveBoardFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchiveBoardFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchiveBoardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
