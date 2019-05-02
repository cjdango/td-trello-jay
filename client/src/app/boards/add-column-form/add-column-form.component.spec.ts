import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddColumnFormComponent } from './add-column-form.component';

describe('AddColumnFormComponent', () => {
  let component: AddColumnFormComponent;
  let fixture: ComponentFixture<AddColumnFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddColumnFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddColumnFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
