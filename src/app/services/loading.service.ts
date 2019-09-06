import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loadingObservable$: Observable<boolean> = this.loading$.asObservable();

  constructor() { }

  showLoading() {
    this.loading$.next(true);
  }

  hideLoading() {
    this.loading$.next(false);
  }

  observableLoading(): Observable<boolean> {
    return this.loadingObservable$;
  }
}
