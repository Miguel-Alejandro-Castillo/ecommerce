import { ValidatorFn, AbstractControl, Validators } from '@angular/forms';

export class ValidatorsCustom {

  static required(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const validator = Validators.required;
      const resultado = validator(control);
      if (resultado) {
        return {required: { code: 'required', parameters: { }}};
      } else {
        return null;
      }
    };
  }

  static min(min: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const validator = Validators.min(min);
      const resultado = validator(control);
      if (resultado) {
        return {min: { code: 'min', parameters: { min: min}}};
      } else {
        return null;
      }
    };
  }

  static max(max: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const validator = Validators.max(max);
      const resultado = validator(control);
      if (resultado) {
        return {max: { code: 'max', parameters: { max: max}}};
      } else {
        return null;
      }
    };
  }

  static minLength(minLength: number) {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const validator = Validators.minLength(minLength);
      const resultado = validator(control);
      if (resultado) {
        return {minLength: { code: 'minLength', parameters: { minLength: minLength}}};
      } else {
        return null;
      }
    };
  }

  static maxLength(maxLength: number) {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const validator = Validators.maxLength(maxLength);
      const resultado = validator(control);
      if (resultado) {
        return {maxLength: { code: 'maxLength', parameters: { maxLength: maxLength}}};
      } else {
        return null;
      }
    };
  }

  static betweenYear(from: number, to: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const year: number = control.value;
      if (year >= from && year <= to) {
        return null;
      } else {
        return { betweenYear: { code: 'betweenYear', parameters: { from: from, to: to } } };
      }
    };
  }

}

