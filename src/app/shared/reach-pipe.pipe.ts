import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reachPipe'
})
export class ReachPipePipe implements PipeTransform {

  transform(value: any[], filtstring: string): any {
    return value ? value.filter(item =>
      // console.log(item)
      item.name.search(new RegExp(filtstring, 'i')) > -1 ||
      item.email.search(new RegExp(filtstring, 'i')) > -1 ||
      item.prof.search(new RegExp(filtstring, 'i')) > -1 ||
      item.last.search(new RegExp(filtstring, 'i')) > -1 ||
      item.typeCount.search(new RegExp(filtstring, 'i')) > -1

    ) : [];

  }

}
