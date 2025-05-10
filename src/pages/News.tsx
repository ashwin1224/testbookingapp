import React from 'react';

interface NewsItem {
  id: number;
  title: string;
  content: string;
  date: string;
  source: string;
  imageUrl?: string;
}

const News: React.FC = () => {
  const newsItems: NewsItem[] = [
    {
      id: 1,
      title: 'IELTS Introduces Computer-Delivered Testing in More Locations',
      content:
        'IELTS has expanded its computer-delivered testing options to more locations worldwide, offering greater flexibility for test takers.',
      date: '2024-03-20',
      source: 'IELTS Official',
      imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    },
    {
      id: 2,
      title: 'New IELTS Test Format Announced for 2024',
      content:
        'IELTS has announced updates to its test format, including enhanced security measures and improved test delivery systems.',
      date: '2024-03-15',
      source: 'IELTS Official',
      imageUrl: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    },
    {
      id: 3,
      title: 'IELTS Success Stories: Student Achieves Perfect Score',
      content:
        'A student from India has achieved a perfect 9.0 band score in all four components of the IELTS test, sharing their preparation journey.',
      date: '2024-03-10',
      source: 'IELTS Success Stories',
      imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Latest IELTS News
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
          Stay updated with the latest news, announcements, and success stories from the IELTS world
        </p>
      </div>

      <div className="mt-12 space-y-12">
        {newsItems.map((item) => (
          <article
            key={item.id}
            className="relative bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="md:flex">
              {item.imageUrl && (
                <div className="md:flex-shrink-0">
                  <img
                    className="h-48 w-full object-cover md:w-48"
                    src={item.imageUrl}
                    alt={item.title}
                  />
                </div>
              )}
              <div className="p-8">
                <div className="uppercase tracking-wide text-sm text-blue-600 font-semibold">
                  {item.source}
                </div>
                <h3 className="mt-2 text-xl font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="mt-3 text-base text-gray-500">{item.content}</p>
                <div className="mt-4">
                  <time
                    dateTime={item.date}
                    className="text-sm text-gray-500"
                  >
                    {new Date(item.date).toLocaleDateString()}
                  </time>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default News; 