import { categoryOf } from '../categories';
import { MarkdownRemark } from '../type';

export default class PostClass {
  id;
  excerpt;
  emoji;
  html;
  slug;
  title;
  author;
  date;
  category;
  categoryTitle;
  tags;
  description;
  dateISO;

  constructor(node: MarkdownRemark) {
    const { id, html, excerpt, frontmatter, fields } = node;
    const { slug } = fields;
    const { emoji, category, tags, title, author, date, description, dateISO } = frontmatter;

    this.id = id;
    this.excerpt = excerpt;
    this.emoji = emoji;
    this.html = html;
    this.slug = slug;
    this.title = title;
    this.author = author;
    this.date = date;
    this.description = description ?? '';
    this.dateISO = dateISO ?? '';
    this.category = category;
    this.categoryTitle = categoryOf(category)?.title ?? category;
    this.tags = (tags || '').split(' ').filter(Boolean);
  }
}
