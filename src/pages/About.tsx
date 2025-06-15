import React from 'react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">About Us</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Welcome to our IELTS Test Booking Platform. We are dedicated to providing a seamless
            experience for students looking to book their IELTS tests across the MENA region.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About; 