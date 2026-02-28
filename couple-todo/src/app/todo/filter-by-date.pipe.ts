import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByDate'
})
export class FilterByDatePipe implements PipeTransform {
  // We added '| null' to the input type to make Angular happy
  transform(tasks: any[] | null, date: string): any[] {
    if (!tasks) return [];
    return tasks.filter(t => t.date === date);
  }
}