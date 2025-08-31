import React from 'react';

interface BlogBlurbProps {
  blurb: string;
  className?: string;
}

const BlogBlurb: React.FC<BlogBlurbProps> = ({ blurb, className = '' }) => {
  return (
    <div className={`text-gray-600 text-sm leading-relaxed ${className}`}>
      <p>{blurb}</p>
    </div>
  );
};

export default BlogBlurb;
