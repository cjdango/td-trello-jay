import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-add-board-form',
  templateUrl: './add-board-form.component.html',
  styleUrls: ['./add-board-form.component.scss']
})
export class AddBoardFormComponent implements OnInit {
  @ViewChild('f') ngForm: FormGroupDirective;

  submitted = false;
  addBoardForm = this.fb.group({
    title: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {}
}
