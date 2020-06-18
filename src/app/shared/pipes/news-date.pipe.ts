import { Article } from 'app/shared/interfaces/article.interface';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'newsSortByDate'
})
export class NewsDatePipe implements PipeTransform {

  transform(articles: Article[]): any {

    if (articles) {
        articles.sort((article1: Article, article2: Article) => {
          return +new Date(article2.publishedAt) - +new Date(article1.publishedAt);
        });

        return articles;
    }
    return null;
  }

}
