import { IArticle } from 'app/shared/interfaces/article.interface';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'newsSortByDate'
})
export class NewsDatePipe implements PipeTransform {

  transform(articles: IArticle[]): any {

    if (articles) {
        articles.sort((article1: IArticle, article2: IArticle) => {
          return +new Date(article2.publishedAt) - +new Date(article1.publishedAt);
        });

        return articles;
    }
    return null;
  }

}
