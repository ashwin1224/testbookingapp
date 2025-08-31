import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { BlogPost, BlogPostDetail } from '../types/blog';
import { blogService } from '../services/blogService';
import { blogTags } from '../data/mockBlogData';
import BlogSEO from '../components/BlogSEO';
import BlogBlurb from '../components/BlogBlurb';

const BlogDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPostDetail | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPost = async () => {
      if (!slug) {
        navigate('/blog');
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const postData = await blogService.getBlogPost(slug);
        
        if (!postData) {
          setError('Blog post not found');
          return;
        }

        setPost(postData);
        const related = await blogService.getRelatedPosts(postData.id);
        setRelatedPosts(related);
      } catch (err) {
        setError('Failed to load blog post');
        console.error('Error loading blog post:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Error</h1>
            <p className="text-gray-600">{error || 'Blog post not found'}</p>
            <Link
              to="/blog"
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Back to Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      {post && <BlogSEO post={post} />}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="h-12 w-12 rounded-full"
            />
            <div>
              <p className="text-sm font-medium text-gray-900">{post.author.name}</p>
              <p className="text-sm text-gray-500">{post.author.role}</p>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <time dateTime={post.publishDate}>
              {new Date(post.publishDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>
        </header>

        {/* Featured Image */}
        <div className="mb-8">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-96 object-cover rounded-lg shadow-sm"
          />
        </div>

        {/* Tags */}
        <div className="mb-8 flex flex-wrap gap-2">
          {post.tags.map((tagId) => {
            const tag = blogTags.find((t) => t.id === tagId);
            return tag ? (
              <span
                key={tag.id}
                className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
              >
                {tag.name}
              </span>
            ) : null;
          })}
        </div>

        {/* Blurb */}
        <div className="mb-8">
          <BlogBlurb blurb={post.blurb} className="text-lg text-gray-700 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400" />
        </div>

        {/* Content */}
        <div
          className="max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  to={`/blog/${relatedPost.slug}`}
                  className="group"
                >
                  <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <img
                      src={relatedPost.imageUrl}
                      alt={relatedPost.title}
                      className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity"
                    />
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                        {relatedPost.title}
                      </h3>
                      <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                        {relatedPost.summary}
                      </p>
                      <div className="mt-4 flex items-center text-sm text-gray-500">
                        <time dateTime={relatedPost.publishDate}>
                          {new Date(relatedPost.publishDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </time>
                        <span className="mx-2">•</span>
                        <span>{relatedPost.readTime}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
};

export default BlogDetail; 