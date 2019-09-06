import {
  Component,
  OnInit,
  ContentChild,
  AfterContentInit,
  ContentChildren,
  Query,
  QueryList
} from '@angular/core';
import { NgControl, FormControl } from '@angular/forms';
import { MessagesErrorComponent } from '../messages-error/messages-error.component';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.css']
})
export class FormFieldComponent implements AfterContentInit {
  @ContentChild(NgControl) ngControl: NgControl;
  @ContentChild(FormControl) formControl: FormControl;
  // @ContentChild(MessagesErrorComponent) messagesErrorComponent: MessagesErrorComponent;
  @ContentChildren(MessagesErrorComponent) messagesErrorComponents: QueryList<
    MessagesErrorComponent
  >;

  constructor() {}

  ngAfterContentInit(): void {

    const messagesErrorComponents = this.messagesErrorComponents.toArray();
    for (const m of messagesErrorComponents) {
      m.input = this.ngControl.control;
    }

    /* falta unsuscribe
    this.messagesErrorComponents.changes.subscribe(messagesErrorComponents => {
      for (const m of messagesErrorComponents) {
        m.input = this.ngControl.control;
      }
    });
    */
    // this.messagesErrorComponent.input = this.ngControl.control;
  }
}
