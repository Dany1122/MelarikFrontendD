import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeTruncate',
  standalone: true,
})
export class TruncatePipe implements PipeTransform {

  transform(value: string | undefined ): string | undefined {
    const maxLength = 40;
    if (value && value.length > maxLength) {
      return value.substring(0, maxLength) + '...';
    }
    return value;
  }

}
