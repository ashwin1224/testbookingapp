import React from 'react';
import { Helmet } from 'react-helmet-async';
import { BlogPost } from '../types/blog';

interface BlogSEOProps {
  post: BlogPost;
}

const BlogSEO: React.FC<BlogSEOProps> = ({ post }) => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.meta.title,
    description: post.meta.description,
    image: post.meta.ogImage || post.imageUrl,
    author: {
      '@type': 'Person',
      name: post.author.name,
    },
    publisher: {
      '@type': 'Organization',
      name: 'IELTS Booking Portal',
      logo: {
        '@type': 'ImageObject',
        url: 'https://ielts-booking.com/logo.png',
      },
    },
    datePublished: post.publishDate,
    dateModified: post.publishDate,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': post.meta.canonicalUrl,
    },
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{post.meta.title}</title>
      <meta name="description" content={post.meta.description} />
      <meta name="keywords" content={post.meta.keywords.join(', ')} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={post.meta.title} />
      <meta property="og:description" content={post.meta.description} />
      <meta property="og:image" content={post.meta.ogImage || post.imageUrl} />
      <meta property="og:url" content={post.meta.canonicalUrl} />
      <meta property="og:type" content="article" />
      <meta property="og:site_name" content="IELTS Booking Portal" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={post.meta.title} />
      <meta name="twitter:description" content={post.meta.description} />
      <meta name="twitter:image" content={post.meta.ogImage || post.imageUrl} />
      
      {/* Canonical URL */}
      {post.meta.canonicalUrl && <link rel="canonical" href={post.meta.canonicalUrl} />}
      
      {/* Author Meta */}
      <meta name="author" content={post.author.name} />
      
      {/* Article Meta */}
      <meta property="article:published_time" content={post.publishDate} />
      <meta property="article:modified_time" content={post.publishDate} />
      <meta property="article:author" content={post.author.name} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default BlogSEO;
