import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {

  transform(value: Date): string {
    if (!(value instanceof Date)) {
      throw new Error('Invalid date');
    }

    const today = new Date();
    let age = today.getFullYear() - value.getFullYear();
    const m = today.getMonth() - value.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < value.getDate())) {
      age--;
    }

    return age.toString();
  }
}