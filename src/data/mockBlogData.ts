import { BlogPost, BlogPostDetail, BlogCategory, BlogTag } from '../types/blog';

export const blogCategories: BlogCategory[] = [
  {
    id: 'test-prep',
    name: 'Test Preparation',
    description: 'Tips and strategies for IELTS test preparation',
  },
  {
    id: 'success-stories',
    name: 'Success Stories',
    description: 'Real stories from successful IELTS candidates',
  },
  {
    id: 'test-format',
    name: 'Test Format',
    description: 'Information about IELTS test format and structure',
  },
  {
    id: 'study-tips',
    name: 'Study Tips',
    description: 'General study tips and best practices',
  },
];

export const blogTags: BlogTag[] = [
  { id: 'reading', name: 'Reading' },
  { id: 'writing', name: 'Writing' },
  { id: 'speaking', name: 'Speaking' },
  { id: 'listening', name: 'Listening' },
  { id: 'grammar', name: 'Grammar' },
  { id: 'vocabulary', name: 'Vocabulary' },
  { id: 'study-tips', name: 'Study Tips' },
  { id: 'test-strategy', name: 'Test Strategy' },
];

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Top 10 Tips for IELTS Reading Success',
    summary: 'Learn the most effective strategies to improve your IELTS Reading score and boost your confidence during the test.',
    content: `
      <h2>Introduction</h2>
      <p>The IELTS Reading test can be challenging, but with the right strategies, you can achieve your target score. Here are our top 10 tips for success.</p>
      
      <h2>1. Skim and Scan</h2>
      <p>Learn to quickly identify the main ideas and locate specific information in the text.</p>
      
      <h2>2. Time Management</h2>
      <p>Allocate your time wisely - spend about 20 minutes on each passage.</p>
      
      <blockquote>Remember: Practice makes perfect. Regular reading practice will help you improve your speed and accuracy.</blockquote>
    `,
    publishDate: '2024-03-15T10:00:00Z',
    author: {
      name: 'John Smith',
      role: 'IELTS Instructor',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    category: 'test-prep',
    tags: ['reading', 'test-strategy'],
    imageUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    readTime: '5 min read',
    slug: 'top-10-tips-for-ielts-reading-success',
  },
  {
    id: '2',
    title: 'My Journey to IELTS Band 8.5',
    summary: 'A personal story of dedication, hard work, and the strategies that helped achieve an outstanding IELTS score.',
    content: `
      <h2>My Story</h2>
      <p>After months of preparation, I finally achieved my dream score. Here's how I did it.</p>
      
      <h2>The Challenge</h2>
      <p>Starting with a band 6.5, I needed to improve by 2 bands to meet my university requirements.</p>
      
      <blockquote>Success is not final, failure is not fatal: it is the courage to continue that counts.</blockquote>
    `,
    publishDate: '2024-03-10T14:30:00Z',
    author: {
      name: 'Sarah Johnson',
      role: 'IELTS Success Story',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    category: 'success-stories',
    tags: ['study-tips', 'test-strategy'],
    imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    readTime: '4 min read',
    slug: 'my-journey-to-ielts-band-8-5',
  },
  {
    id: '3',
    title: 'Understanding the New Computer-Based IELTS Test',
    summary: 'Everything you need to know about the computer-delivered IELTS test format and how it differs from the paper-based test.',
    content: `
      <h2>What is Computer-Based IELTS?</h2>
      <p>The computer-delivered IELTS test offers more flexibility and faster results. Here's what you need to know.</p>
      
      <h2>Key Differences</h2>
      <ul>
        <li>Faster results (3-5 days)</li>
        <li>More test dates available</li>
        <li>Word count and timer on screen</li>
      </ul>
      
      <blockquote>The computer-based test is not easier or harder - it's just different. Choose the format that suits you best.</blockquote>
    `,
    publishDate: '2024-03-05T09:15:00Z',
    author: {
      name: 'Michael Brown',
      role: 'IELTS Test Administrator',
      avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    category: 'test-format',
    tags: ['test-strategy'],
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    readTime: '6 min read',
    slug: 'understanding-the-new-computer-based-ielts-test',
  },
];

export const blogPostDetails: Record<string, BlogPostDetail> = {
  '1': {
    ...blogPosts[0],
    relatedPosts: ['2', '3'],
  },
  '2': {
    ...blogPosts[1],
    relatedPosts: ['1', '3'],
  },
  '3': {
    ...blogPosts[2],
    relatedPosts: ['1', '2'],
  },
}; 