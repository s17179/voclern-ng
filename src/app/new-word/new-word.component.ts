import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {WordService} from '../word/word.service';
import {Uuid} from '../util/uuid';

@Component({
  selector: 'app-new-word',
  templateUrl: './new-word.component.html',
  styleUrls: ['./new-word.component.css']
})
export class NewWordComponent implements OnInit {
  newWordForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private wordService: WordService) {
  }

  ngOnInit(): void {
    this.newWordForm = this.formBuilder.group({
      value: [null, Validators.required],
      translation: [null, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.newWordForm.valid) {
      this.wordService.addWord({
        id: Uuid.random(),
        value: this.newWordForm.value.value,
        translation: this.newWordForm.value.translation
      });
    }
  }
}
