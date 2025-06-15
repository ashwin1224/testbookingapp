import { BlogPost, BlogPostDetail, BlogListResponse } from '../types/blog';
import { blogPosts, blogCategories, blogTags, blogPostDetails } from '../data/mockBlogData';

export interface BlogService {
  getBlogList(page?: number, category?: string, tag?: string): Promise<BlogListResponse>;
  getBlogPost(slug: string): Promise<BlogPostDetail | null>;
  getRelatedPosts(postId: string): Promise<BlogPost[]>;
  // Admin methods
  createBlogPost(post: Omit<BlogPost, 'id' | 'slug'>): Promise<BlogPost>;
  updateBlogPost(id: string, post: Partial<BlogPost>): Promise<BlogPost>;
  deleteBlogPost(id: string): Promise<boolean>;
  uploadBlogImage(file: File): Promise<string>;
}

class BlogServiceImpl implements BlogService {
  private readonly ITEMS_PER_PAGE = 6;

  async getBlogList(page = 1, category?: string, tag?: string): Promise<BlogListResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    let filteredPosts = [...blogPosts];

    // Apply category filter
    if (category) {
      filteredPosts = filteredPosts.filter(post => post.category === category);
    }

    // Apply tag filter
    if (tag) {
      filteredPosts = filteredPosts.filter(post => post.tags.includes(tag));
    }

    // Calculate pagination
    const totalPosts = filteredPosts.length;
    const totalPages = Math.ceil(totalPosts / this.ITEMS_PER_PAGE);
    const startIndex = (page - 1) * this.ITEMS_PER_PAGE;
    const endIndex = startIndex + this.ITEMS_PER_PAGE;

    // Get paginated posts
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

    return {
      posts: paginatedPosts,
      categories: blogCategories,
      tags: blogTags,
      totalPosts,
      currentPage: page,
      totalPages,
    };
  }

  async getBlogPost(slug: string): Promise<BlogPostDetail | null> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    const post = blogPosts.find(p => p.slug === slug);
    if (!post) {
      return null;
    }

    return blogPostDetails[post.id] || null;
  }

  async getRelatedPosts(postId: string): Promise<BlogPost[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));

    const post = blogPostDetails[postId];
    if (!post || !post.relatedPosts) {
      return [];
    }

    return post.relatedPosts
      .map(id => blogPosts.find(p => p.id === id))
      .filter((post): post is BlogPost => post !== undefined);
  }

  async createBlogPost(post: Omit<BlogPost, 'id' | 'slug'>): Promise<BlogPost> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Generate a new ID and slug
    const id = (Math.max(...blogPosts.map(p => parseInt(p.id))) + 1).toString();
    const slug = post.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const newPost: BlogPost = {
      ...post,
      id,
      slug,
    };

    // In a real implementation, this would be an API call
    blogPosts.push(newPost);
    blogPostDetails[id] = {
      ...newPost,
      content: post.content || '',
      relatedPosts: [],
    };

    return newPost;
  }

  async updateBlogPost(id: string, updates: Partial<BlogPost>): Promise<BlogPost> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const postIndex = blogPosts.findIndex(p => p.id === id);
    if (postIndex === -1) {
      throw new Error('Blog post not found');
    }

    // Update the post
    const updatedPost = {
      ...blogPosts[postIndex],
      ...updates,
      // If title is updated, update the slug
      slug: updates.title
        ? updates.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
        : blogPosts[postIndex].slug,
    };

    // In a real implementation, this would be an API call
    blogPosts[postIndex] = updatedPost;
    if (blogPostDetails[id]) {
      blogPostDetails[id] = {
        ...blogPostDetails[id],
        ...updatedPost,
      };
    }

    return updatedPost;
  }

  async deleteBlogPost(id: string): Promise<boolean> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const postIndex = blogPosts.findIndex(p => p.id === id);
    if (postIndex === -1) {
      throw new Error('Blog post not found');
    }

    // In a real implementation, this would be an API call
    blogPosts.splice(postIndex, 1);
    delete blogPostDetails[id];

    return true;
  }

  async uploadBlogImage(file: File): Promise<string> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // In a real implementation, this would upload to a server and return the URL
    // For now, we'll return a mock URL
    return `https://images.unsplash.com/photo-${Math.random().toString(36).substring(7)}?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80`;
  }
}

// Export a singleton instance
export const blogService = new BlogServiceImpl(); 