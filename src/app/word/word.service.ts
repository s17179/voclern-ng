import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Word} from './word';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({providedIn: 'root'})
export class WordService {
  words = new BehaviorSubject<Word[]>([]);

  constructor(private httpClient: HttpClient, private router: Router) {
    this.loadWords();
  }

  addWord(word: Word): void {
    this.httpClient.post<null>(
      'http://localhost:8080/api/add-word',
      {
        id: word.id,
        wordValue: word.value,
        wordTranslation: word.translation
      }
    ).subscribe(() => {
      this.words.next(this.words.getValue().concat([word]));
    }, error => {
    }, () => {
      this.router.navigate(['/word-list']);
    });
  }

  removeWord(id: string): void {
    this.httpClient.delete<null>(
      'http://localhost:8080/api/word/remove/' + id
    ).subscribe(() => {
      this.words.next(this.words.getValue().filter((word => {
        return word.id !== id;
      })));
    }, error => {
    }, () => {
    });
  }

  private loadWords(): void {
    this.httpClient.get<Word[]>(
      'http://localhost:8080/api/word-list'
    ).subscribe(words => {
      this.words.next(words);
    });
  }
}
