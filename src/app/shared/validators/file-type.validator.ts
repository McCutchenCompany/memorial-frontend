import { AbstractControl } from '@angular/forms';

export function fileTypeValidator(control: AbstractControl): { [key: string]: boolean } | null {

  if (control.value.type !== 'image/jpeg' && control.value.type !== 'image/png') {
    return { 'badType': true};
  }
  return null;
}
