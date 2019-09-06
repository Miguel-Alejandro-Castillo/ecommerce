import {
  Component,
  OnInit,
  Input,
  ChangeDetectorRef,
  DoCheck
} from '@angular/core';
import { AbstractControl } from '@angular/forms';
// import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-messages-error',
  templateUrl: './messages-error.component.html',
  styleUrls: ['./messages-error.component.css']/* ,
  changeDetection: ChangeDetectionStrategy.OnPush */
})
export class MessagesErrorComponent implements OnInit {
  //  @ContentChild(AbstractControl) input: AbstractControl;

 /*  lastValue = false; */
 @Input()
  input: AbstractControl;

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


  constructor(/* private cdRef: ChangeDetectorRef */) {}

  ngOnInit() {}

 /*  private resolveErrorMessage() {
    //    return "";
  } */
}
