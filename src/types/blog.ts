export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  blurb: string;
  content: string;
  publishDate: string;
  author: BlogAuthor;
  category: string;
  tags: string[];
  imageUrl: string;
  readTime: string;
  slug: string;
  meta: {
    title: string;
    description: string;
    keywords: string[];
    ogImage?: string;
    canonicalUrl?: string;
  };
}

export interface BlogPostDetail extends BlogPost {
  relatedPosts: string[];
}

export interface BlogCategory {
  id: string;
  name: string;
  description: string;
}

export interface BlogTag {
  id: string;
  name: string;
}

export interface BlogAuthor {
  name: string;
  role: string;
  avatar?: string;
}

export interface BlogListResponse {
  posts: BlogPost[];
  categories: BlogCategory[];
  tags: BlogTag[];
  totalPosts: number;
  currentPage: number;
  totalPages: number;
} 