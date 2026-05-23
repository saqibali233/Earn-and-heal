export type ToolCategory = 
  | 'ai' 
  | 'seo' 
  | 'text' 
  | 'image' 
  | 'pdf' 
  | 'calculator' 
  | 'developer' 
  | 'finance' 
  | 'social' 
  | 'youtube' 
  | 'speed';

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: ToolCategory;
  slug: string;
  icon: string;
  popular?: boolean;
  featured?: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  authorId: string;
  categoryId: string;
  tags: string[];
  featuredImage: string;
  publishedAt: Date;
  seoTitle?: string;
  seoDescription?: string;
}

export interface AffiliateProduct {
  id: string;
  name: string;
  description: string;
  price: string;
  affiliateUrl: string;
  imageUrl: string;
  category: string;
  rating: number;
}
