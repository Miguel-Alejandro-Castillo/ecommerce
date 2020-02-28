import { Component, Input, OnInit, ViewContainerRef,  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy, } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';

export interface AppError {
  code: string;
  parameters: { [key: string]: string };
}

@Component({
  selector: 'app-messages-error',
  templateUrl: './messages-error.component.html',
  styleUrls: [
    './messages-error.component.css'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagesErrorComponent implements OnInit,  OnDestroy  {


  //  @ContentChild(AbstractControl) input: AbstractControl;

  /*  lastValue = false; */

  private _messages: string[] = [];

  private translateService: TranslateService;
  constructor(private changeDetector: ChangeDetectorRef,
              private viewContainerRef: ViewContainerRef,
              translate: TranslateService) {
              this.translateService = translate;
  }

  private subscriptions: Subscription[] = [];

  messages$: Observable<AppError[]>;


  private _input: AbstractControl;
  @Input() set input(control: AbstractControl) {

    this._input = control;

    if (this._input) {
      this.subscriptions.push(this._input.statusChanges.subscribe(() => {
        this.check();
      }));
      this.check();
    } else {
      this.changeDetector.markForCheck();
    }
  }

  private check() {
    const errors: AppError[] = this._input.errors ? Object.values(this._input.errors) :  [];
    this._messages = errors.map((error: AppError) => this.translateService.instant(error.code, error.parameters) );
    this.changeDetector.markForCheck();
  }

  private _touched = false;
  set touched(value: boolean) {
    this._touched = value;
    this.changeDetector.markForCheck();
  }


  /* @Input()
  validatorsKeys: string[]; */

  /* ngDoCheck(): void {
    console.log('hola');
    if (this._input && this._input.touched !== this.lastValue) {
      this.lastValue = this._input.touched;
      this.cdRef.markForCheck();
    }
  } */

  /*  @Input()
  set input(input: AbstractControl) {
    this._input = input;
    this.cdRef.markForCheck();
    // TODO FALTA ON DESTROY
    this._input.valueChanges.subscribe(() => this.cdRef.markForCheck());
  } */

  ngOnInit(): void {
    console.log(this.viewContainerRef);
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

}

