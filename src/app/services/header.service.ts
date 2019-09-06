import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Portal } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  portalContent$: BehaviorSubject<Portal<any>> = new BehaviorSubject<Portal<any>>(null);

  constructor() {
   }
}
