import { BlogPost } from './types';

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Top 10 SEO Strategies for 2026',
    slug: 'top-10-seo-strategies-2026',
    excerpt: 'Discover the latest search engine optimization trends that are dominating the USA market this year.',
    content: `
# Top 10 SEO Strategies for 2026

Search engine optimization is constantly evolving. In 2026, the focus has shifted heavily towards AI-driven search intent and high-quality utility content.

## 1. Zero-Click Search Optimization
Optimize your content to answer questions directly on the search results page.

## 2. Voice Search and Natural Language
With the rise of AI assistants, optimizing for conversational queries is more important than ever.

## 3. Topical Authority over Keyword Density
Search engines now value expertise and comprehensive coverage of a topic more than simple keyword matching.
    `,
    authorId: 'admin',
    categoryId: 'seo',
    tags: ['SEO', 'Digital Marketing', '2026'],
    featuredImage: 'https://picsum.photos/seed/seo/800/600',
    publishedAt: new Date('2026-05-10')
  },
  {
    id: '2',
    title: 'The Future of AI Tools in Content Creation',
    slug: 'future-ai-tools-content-creation',
    excerpt: 'How artificial intelligence is revolutionizing the way we write, design, and optimize content.',
    content: `
# The Future of AI Tools

AI is no longer just a trend; it is a fundamental part of the content creator's toolkit. Tools like Earnandheal are at the forefront of this revolution.

## The Shift to Generative Utility
Tools that don't just generate text, but provide utility like formatting, SEO checking, and technical analysis are winning.
    `,
    authorId: 'admin',
    categoryId: 'ai',
    tags: ['AI', 'Tech', 'Productivity'],
    featuredImage: 'https://picsum.photos/seed/ai/800/600',
    publishedAt: new Date('2026-05-11')
  }
];
