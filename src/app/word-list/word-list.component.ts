import {Component, OnDestroy, OnInit} from '@angular/core';
import {Word} from '../word/word';
import {WordService} from '../word/word.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-word-list',
  templateUrl: './word-list.component.html',
  styleUrls: ['./word-list.component.css']
})
export class WordListComponent implements OnInit, OnDestroy {
  words: Word[] = [];
  wordsSubscription!: Subscription;

  constructor(private wordService: WordService) {
  }

  ngOnInit(): void {
    this.wordsSubscription = this.wordService.words.subscribe(words => {
      this.words = words;
    });
  }

  ngOnDestroy(): void {
    this.wordsSubscription.unsubscribe();
  }

  onRemoveWord(id: string): void {
    this.wordService.removeWord(id);
  }
}
