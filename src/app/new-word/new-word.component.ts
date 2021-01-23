import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {WordService} from '../word/word.service';
import {Uuid} from '../util/uuid';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-new-word',
  templateUrl: './new-word.component.html',
  styleUrls: ['./new-word.component.css']
})
export class NewWordComponent implements OnInit {
  newWordForm!: FormGroup;
  isEditMode = false;
  private selectedWordId?: string;

  constructor(private formBuilder: FormBuilder, private wordService: WordService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.newWordForm = this.formBuilder.group({
      value: [null, Validators.required],
      translation: [null, Validators.required]
    });

    this.route.params.subscribe((params: Params) => {
      const wordId = params.id;

      if (wordId) {
        this.wordService.get(params.id).subscribe(word => {
          this.newWordForm.setValue({
            value: word.value,
            translation: word.translation
          });
        });
        this.isEditMode = true;
        this.selectedWordId = wordId;
      }
    });
  }

  onSubmit(): void {
    if (this.newWordForm.valid) {
      if (this.isEditMode) {
        if (this.selectedWordId) {
          this.wordService.editWord({
            id: this.selectedWordId,
            value: this.newWordForm.value.value,
            translation: this.newWordForm.value.translation
          });
        }
      } else {
        this.wordService.addWord({
          id: Uuid.random(),
          value: this.newWordForm.value.value,
          translation: this.newWordForm.value.translation
        });
      }
    }
  }
}
