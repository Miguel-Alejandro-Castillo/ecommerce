import {
  Component,
  OnInit,
  ContentChild,
  AfterContentInit,
  ContentChildren,
  Query,
  QueryList,
  forwardRef,
  ChangeDetectionStrategy,
  DoCheck
} from '@angular/core';
import { NgControl, FormControl, FormControlName, AbstractControl } from '@angular/forms';
import { MessagesErrorComponent } from '../messages-error/messages-error.component';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormFieldComponent implements AfterContentInit, DoCheck{

  @ContentChild(forwardRef(() => FormControlName)) formControlName: FormControlName;
  @ContentChild(forwardRef(() => MessagesErrorComponent)) messagesErrorComponent?: MessagesErrorComponent;

  private touched = false;
  constructor() {}

  private formControl: AbstractControl;

  ngAfterContentInit(): void {
      this.formControl = this.formControlName.control;
      if (this.messagesErrorComponent) {
        this.messagesErrorComponent.input = this.formControl;
      }
  }

  ngDoCheck(): void {
    if (this.formControlName && this.formControl && this.formControl.touched !== this.touched) {
      this.touched = this.formControl.touched;
      if (this.messagesErrorComponent) {
        this.messagesErrorComponent.touched = this.touched;
      }
    }
  }
}
