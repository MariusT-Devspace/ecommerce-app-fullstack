import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
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
