import React from 'react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
}

const Blog: React.FC = () => {
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: 'Top 10 Tips for IELTS Speaking Success',
      excerpt:
        'Learn the most effective strategies to improve your IELTS Speaking score and boost your confidence during the test.',
      date: '2024-03-15',
      author: 'John Smith',
      category: 'Speaking',
    },
    {
      id: 2,
      title: 'Understanding IELTS Writing Task 2',
      excerpt:
        'A comprehensive guide to mastering IELTS Writing Task 2, including essay structure, common topics, and scoring criteria.',
      date: '2024-03-10',
      author: 'Sarah Johnson',
      category: 'Writing',
    },
    {
      id: 3,
      title: 'IELTS Reading: Time Management Strategies',
      excerpt:
        'Discover proven techniques to manage your time effectively during the IELTS Reading test and improve your score.',
      date: '2024-03-05',
      author: 'Michael Brown',
      category: 'Reading',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          IELTS Blog
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
          Expert tips, strategies, and insights to help you succeed in your IELTS test
        </p>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <article
            key={post.id}
            className="flex flex-col shadow-lg rounded-lg overflow-hidden"
          >
            <div className="flex-1 bg-white p-6 flex flex-col justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-blue-600">{post.category}</p>
                <h3 className="mt-2 text-xl font-semibold text-gray-900">
                  {post.title}
                </h3>
                <p className="mt-3 text-base text-gray-500">{post.excerpt}</p>
              </div>
              <div className="mt-6 flex items-center">
                <div className="flex-shrink-0">
                  <span className="sr-only">{post.author}</span>
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500 font-medium">
                      {post.author.split(' ').map((n) => n[0]).join('')}
                    </span>
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{post.author}</p>
                  <div className="flex space-x-1 text-sm text-gray-500">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString()}
                    </time>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Blog; 