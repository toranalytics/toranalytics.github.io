import { categoryOf } from '../categories';
import { categoryText, Lang, langOf } from '../i18n';
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
  lang: Lang;
  translationKey;

  constructor(node: MarkdownRemark) {
    const { id, html, excerpt, frontmatter, fields } = node;
    const { slug } = fields;
    const { emoji, category, tags, title, author, date, description, dateISO, lang, translationKey } = frontmatter;

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
    this.lang = langOf(lang, /[가-힣]/.test(title) ? 'ko' : 'en');
    this.translationKey = translationKey ?? slug;
    this.category = category;
    this.categoryTitle = categoryText(category, this.lang)?.title ?? categoryOf(category)?.title ?? category;
    this.tags = (tags || '').split(' ').filter(Boolean);
  }
}
