import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BlogPost, BlogCategory, BlogTag } from '../../../types/blog';
import { blogService } from '../../../services/blogService';
import { blogCategories, blogTags } from '../../../data/mockBlogData';

interface EditorState {
  title: string;
  summary: string;
  category: string;
  tags: string[];
  content: string;
  imageUrl: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  readTime: string;
}

const BlogEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editorState, setEditorState] = useState<EditorState>({
    title: '',
    summary: '',
    category: '',
    tags: [],
    content: '',
    imageUrl: '',
    author: {
      name: '',
      role: '',
    },
    readTime: '',
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (id) {
      loadPost();
    } else {
      setLoading(false);
    }
  }, [id]);

  const loadPost = async () => {
    try {
      setLoading(true);
      setError(null);
      const post = await blogService.getBlogPost(id!);
      if (!post) {
        setError('Blog post not found');
        return;
      }
      setEditorState({
        title: post.title,
        summary: post.summary,
        category: post.category,
        tags: post.tags,
        content: post.content,
        imageUrl: post.imageUrl,
        author: post.author,
        readTime: post.readTime,
      });
    } catch (err) {
      setError('Failed to load blog post');
      console.error('Error loading blog post:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name.startsWith('author.')) {
      const field = name.split('.')[1];
      setEditorState(prev => ({
        ...prev,
        author: {
          ...prev.author,
          [field]: value,
        },
      }));
    } else {
      setEditorState(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleTagChange = (tagId: string) => {
    setEditorState(prev => ({
      ...prev,
      tags: prev.tags.includes(tagId)
        ? prev.tags.filter(id => id !== tagId)
        : [...prev.tags, tagId],
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setSaving(true);
      const imageUrl = await blogService.uploadBlogImage(file);
      setEditorState(prev => ({
        ...prev,
        imageUrl,
      }));
    } catch (err) {
      setError('Failed to upload image');
      console.error('Error uploading image:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleEditorChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditorState(prev => ({
      ...prev,
      content: e.target.value,
    }));
  };

  const insertTag = (tag: string, isBlock: boolean = false) => {
    const textarea = document.getElementById('content') as HTMLTextAreaElement;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    const before = textarea.value.substring(0, start);
    const after = textarea.value.substring(end);

    let newContent: string;
    let newCursorPosition: number;

    if (isBlock) {
      // For block elements like lists and quotes, add newlines
      newContent = before + '\n' + tag.replace('{content}', selectedText) + '\n' + after;
      newCursorPosition = start + tag.length + 2; // +2 for the newlines
    } else {
      // For inline elements like bold and italic
      newContent = before + tag.replace('{content}', selectedText) + after;
      newCursorPosition = start + tag.length;
    }
    
    setEditorState(prev => ({
      ...prev,
      content: newContent,
    }));

    // Restore cursor position after the inserted tag
    setTimeout(() => {
      textarea.focus();
      if (selectedText) {
        // If text was selected, place cursor after the inserted tag
        textarea.setSelectionRange(newCursorPosition, newCursorPosition);
      } else {
        // If no text was selected, place cursor between the tags
        const tagLength = tag.indexOf('{content}');
        textarea.setSelectionRange(start + tagLength, start + tagLength);
      }
    }, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      setError(null);

      const postData = {
        ...editorState,
        publishDate: new Date().toISOString(),
      };

      if (id) {
        await blogService.updateBlogPost(id, postData);
      } else {
        await blogService.createBlogPost(postData);
      }

      navigate('/admin/manage/blog');
    } catch (err) {
      setError('Failed to save blog post');
      console.error('Error saving blog post:', err);
    } finally {
      setSaving(false);
    }
  };

  const getCategoryName = (categoryId: string) => {
    return blogCategories.find(cat => cat.id === categoryId)?.name || '';
  };

  const getTagNames = (tagIds: string[]) => {
    return tagIds.map(id => blogTags.find(tag => tag.id === id)?.name || '').filter(Boolean);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const PreviewModal: React.FC = () => {
    if (!showPreview) return null;

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          {/* Background overlay */}
          <div 
            className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
            onClick={() => setShowPreview(false)}
          />

          {/* Modal panel */}
          <div className="inline-block w-full max-w-4xl px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:p-6">
            <div className="absolute top-0 right-0 pt-4 pr-4">
              <button
                type="button"
                onClick={() => setShowPreview(false)}
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <span className="sr-only">Close</span>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Preview content */}
            <div className="mt-2">
              <article className="prose prose-lg max-w-none">
                {/* Header */}
                <header className="mb-8">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    {editorState.title}
                  </h1>
                  <div className="flex items-center space-x-4 text-gray-600">
                    <div className="flex items-center">
                      {editorState.author.avatar && (
                        <img
                          src={editorState.author.avatar}
                          alt={editorState.author.name}
                          className="w-10 h-10 rounded-full mr-3"
                        />
                      )}
                      <div>
                        <p className="font-medium text-gray-900">{editorState.author.name}</p>
                        <p className="text-sm">{editorState.author.role}</p>
                      </div>
                    </div>
                    <span>•</span>
                    <time dateTime={new Date().toISOString()}>
                      {formatDate(new Date().toISOString())}
                    </time>
                    <span>•</span>
                    <span>{editorState.readTime}</span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {getCategoryName(editorState.category)}
                    </span>
                    {getTagNames(editorState.tags).map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </header>

                {/* Featured Image */}
                {editorState.imageUrl && (
                  <div className="mb-8">
                    <img
                      src={editorState.imageUrl}
                      alt={editorState.title}
                      className="w-full h-96 object-cover rounded-lg"
                    />
                  </div>
                )}

                {/* Summary */}
                {editorState.summary && (
                  <div className="mb-8 text-xl text-gray-600 italic">
                    {editorState.summary}
                  </div>
                )}

                {/* Content */}
                <div 
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: editorState.content }}
                />
              </article>
            </div>

            {/* Action buttons */}
            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowPreview(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Back to Editor
              </button>
              <button
                type="submit"
                form="blog-form"
                disabled={saving}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Publishing...' : 'Publish Post'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/admin/manage/blog')}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <h1 className="text-2xl font-bold text-gray-900">
                {id ? 'Edit Blog Post' : 'Create New Blog Post'}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/admin/manage/blog')}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setShowPreview(true)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Preview
              </button>
              <button
                type="submit"
                form="blog-form"
                disabled={saving}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {saving ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Saving...
                  </span>
                ) : (
                  id ? 'Update Post' : 'Publish Post'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      <PreviewModal />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            </div>
          </div>
        )}

        <form id="blog-form" onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={editorState.title}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter post title"
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-lg"
                />
              </div>

              {/* Content Editor */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Content
                  </label>
                  <div className="flex flex-wrap gap-1 bg-gray-50 p-2 rounded-lg border border-gray-200">
                    {/* Bold */}
                    <button
                      type="button"
                      onClick={() => insertTag('<strong>{content}</strong>')}
                      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                      title="Bold"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 12h8a4 4 0 100-8H6v8zm0 0h8a4 4 0 110 8H6v-8z" />
                      </svg>
                    </button>

                    {/* Italic */}
                    <button
                      type="button"
                      onClick={() => insertTag('<em>{content}</em>')}
                      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                      title="Italic"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l-4 4-4-4" />
                      </svg>
                    </button>

                    {/* Underline */}
                    <button
                      type="button"
                      onClick={() => insertTag('<u>{content}</u>')}
                      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                      title="Underline"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                    </button>

                    {/* Strikethrough */}
                    <button
                      type="button"
                      onClick={() => insertTag('<s>{content}</s>')}
                      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                      title="Strikethrough"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                      </svg>
                    </button>

                    {/* Divider */}
                    <div className="w-px h-6 bg-gray-300 mx-1" />

                    {/* Ordered List */}
                    <button
                      type="button"
                      onClick={() => insertTag('<ol><li>{content}</li></ol>', true)}
                      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                      title="Ordered List"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20h14M7 12h14M7 4h14M3 20h.01M3 12h.01M3 4h.01" />
                      </svg>
                    </button>

                    {/* Unordered List */}
                    <button
                      type="button"
                      onClick={() => insertTag('<ul><li>{content}</li></ul>', true)}
                      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                      title="Unordered List"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    </button>

                    {/* Quote */}
                    <button
                      type="button"
                      onClick={() => insertTag('<blockquote>{content}</blockquote>', true)}
                      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                      title="Quote"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                    </button>
                  </div>
                </div>
                <textarea
                  id="content"
                  value={editorState.content}
                  onChange={handleEditorChange}
                  required
                  rows={20}
                  placeholder="Write your post content here..."
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 font-mono text-base"
                />
              </div>
            </div>

            {/* Sidebar Column */}
            <div className="space-y-6">
              {/* Summary */}
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Post Details</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="summary" className="block text-sm font-medium text-gray-700">
                      Summary
                    </label>
                    <textarea
                      id="summary"
                      name="summary"
                      value={editorState.summary}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      placeholder="Brief description of your post"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                      Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={editorState.category}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="">Select a category</option>
                      {blogCategories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tags
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {blogTags.map((tag) => (
                        <button
                          key={tag.id}
                          type="button"
                          onClick={() => handleTagChange(tag.id)}
                          className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                            editorState.tags.includes(tag.id)
                              ? 'bg-blue-100 text-blue-800 ring-2 ring-blue-500 ring-offset-2'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {tag.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Author Information */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-gray-700">Author Information</h4>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="author.name" className="block text-sm font-medium text-gray-700">
                          Name
                        </label>
                        <input
                          type="text"
                          id="author.name"
                          name="author.name"
                          value={editorState.author.name}
                          onChange={handleInputChange}
                          required
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="author.role" className="block text-sm font-medium text-gray-700">
                          Role
                        </label>
                        <input
                          type="text"
                          id="author.role"
                          name="author.role"
                          value={editorState.author.role}
                          onChange={handleInputChange}
                          required
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Read Time */}
                  <div>
                    <label htmlFor="readTime" className="block text-sm font-medium text-gray-700">
                      Read Time
                    </label>
                    <input
                      type="text"
                      id="readTime"
                      name="readTime"
                      value={editorState.readTime}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., 5 min read"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  {/* Cover Image */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cover Image
                    </label>
                    <div className="mt-1 flex items-center space-x-4">
                      {editorState.imageUrl ? (
                        <div className="relative group">
                          <img
                            src={editorState.imageUrl}
                            alt="Cover"
                            className="w-32 h-32 object-cover rounded-lg shadow-sm"
                          />
                          <button
                            type="button"
                            onClick={() => setEditorState(prev => ({ ...prev, imageUrl: '' }))}
                            className="absolute top-2 right-2 p-1 bg-red-100 text-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ) : (
                        <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                      <div>
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleImageUpload}
                          accept="image/*"
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                        >
                          {editorState.imageUrl ? 'Change Image' : 'Upload Image'}
                        </button>
                        <p className="mt-1 text-xs text-gray-500">
                          Recommended: 1200x630px
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogEditor; 