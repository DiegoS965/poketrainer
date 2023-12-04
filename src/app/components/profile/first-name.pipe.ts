import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstName'
})
export class FirstNamePipe implements PipeTransform {

  transform(fullName: string): string {
    if (!fullName) {
      return '';
    }
    const names = fullName.split(' ');
    return names[0];
  }

}