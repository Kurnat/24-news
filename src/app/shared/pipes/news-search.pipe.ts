import { Category } from './../interfaces/category.interface';
import { Article } from 'app/shared/interfaces/article.interface';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'newsSearch'
})
export class NewsSearchPipe implements PipeTransform {

  transform(categorys: Category[], args: string): unknown {
    if (categorys) {
      console.log(categorys, args);

      return categorys.filter((category: Category) => {
        // tslint:disable-next-line:max-line-length
        return category.nameUA.toLocaleLowerCase().includes(args.toLowerCase()) || category.nameEN.toLocaleLowerCase().includes(args.toLowerCase());
      });
    }
    return null;
  }

}
