import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBoardFormComponent } from './add-board-form.component';

describe('AddBoardFormComponent', () => {
  let component: AddBoardFormComponent;
  let fixture: ComponentFixture<AddBoardFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddBoardFormComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBoardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
