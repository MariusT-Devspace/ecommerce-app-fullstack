import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TitleManagerService {
  private titleSubject$ = new Subject<string>();
  title$ = this.titleSubject$.asObservable();

  setTitle(title: string) {
    this.titleSubject$.next(title);
  }
}
