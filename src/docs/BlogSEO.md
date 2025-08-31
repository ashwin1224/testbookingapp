# Blog SEO Features

This document describes the SEO features added to the blog system.

## New Fields Added

### 1. Blurb Field
- **Purpose**: Text used by search engines to display an outline of the blog
- **Usage**: Displayed prominently on blog detail pages and used for search snippets
- **Length**: Recommended 150-160 characters for optimal search display

### 2. Meta Section
- **Purpose**: Comprehensive SEO metadata for search engines and social sharing
- **Fields**:
  - `title`: SEO-optimized page title (includes brand name)
  - `description`: Meta description for search results
  - `keywords`: Array of relevant keywords
  - `ogImage`: Open Graph image for social sharing
  - `canonicalUrl`: Canonical URL to prevent duplicate content issues

## Components Created

### BlogSEO Component (`src/components/BlogSEO.tsx`)
- Automatically generates all necessary meta tags
- Includes Open Graph and Twitter Card meta tags
- Provides structured data (JSON-LD) for search engines
- Uses react-helmet-async for dynamic meta tag management

### BlogBlurb Component (`src/components/BlogBlurb.tsx`)
- Displays the blog blurb with customizable styling
- Used in blog detail pages and previews

## Usage Examples

### In Blog Detail Page
```tsx
import BlogSEO from '../components/BlogSEO';
import BlogBlurb from '../components/BlogBlurb';

// In your component
{post && <BlogSEO post={post} />}
<BlogBlurb blurb={post.blurb} className="custom-styling" />
```

### Meta Data Structure
```typescript
meta: {
  title: 'Blog Title | Brand Name',
  description: 'SEO-optimized description for search results',
  keywords: ['keyword1', 'keyword2', 'keyword3'],
  ogImage: 'https://example.com/og-image.jpg',
  canonicalUrl: 'https://example.com/blog/post-slug',
}
```

## SEO Benefits

1. **Search Engine Optimization**: Proper meta tags improve search rankings
2. **Social Media Sharing**: Rich previews when shared on social platforms
3. **Structured Data**: Helps search engines understand content better
4. **Duplicate Content Prevention**: Canonical URLs prevent SEO issues
5. **User Experience**: Better snippets in search results

## Implementation Notes

- All blog posts now include blurb and meta fields
- SEO component automatically handles all meta tag generation
- Blurb component provides consistent display across the application
- Structured data follows Schema.org standards for blog posts
