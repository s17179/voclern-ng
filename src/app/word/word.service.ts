import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
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

  editWord(word: Word): void {
    this.httpClient.post<null>(
      'http://localhost:8080/api/word/update',
      {
        id: word.id,
        wordValue: word.value,
        wordTranslation: word.translation
      }
    ).subscribe(() => {
      const words = this.words.getValue();
      const index = words.findIndex(w => w.id === word.id);
      words[index] = word;
      this.words.next(words);
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

  get(id: string): Observable<Word> {
    return this.httpClient.get<Word>('http://localhost:8080/api/word/' + id);
  }

  private loadWords(): void {
    this.httpClient.get<Word[]>(
      'http://localhost:8080/api/word-list'
    ).subscribe(words => {
      this.words.next(words);
    });
  }
}
