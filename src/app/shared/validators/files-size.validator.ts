import { AbstractControl } from '@angular/forms';

export function fileSizeValidator(control: AbstractControl): { [key: string]: boolean } | null {

  if (control.value.size > 2000000) {
    return { 'tooBig': true};
  }
  return null;
}
