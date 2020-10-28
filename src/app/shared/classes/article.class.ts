import { IArticle } from '../interfaces/article.interface';

export class Article implements IArticle {
  public source;
  public name;
  public author;
  public title;
  public description;
  public url;
  public urlToImage;
  public publishedAt;
  public content;
  public category;
  public id;
  public typeNews;

  constructor({
    source,
    name,
    author,
    title,
    description,
    url,
    urlToImage,
    publishedAt,
    content,
    category,
    id,
    typeNews,
  }) {
    this.source = source;
    this.name = name;
    this.author = author;
    this.title = title;
    this.description = description;
    this.url = url;
    this.urlToImage = urlToImage;
    this.publishedAt = publishedAt;
    this.content = content;
    this.category = category;
    this.id = id;
    this.typeNews = typeNews;
  }
}
