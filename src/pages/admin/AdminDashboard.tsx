import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Admin Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          to="/admin/manage/blog"
          className="block p-6 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Blog Management</h3>
          <p className="text-gray-600">Manage blog posts, categories, and tags</p>
        </Link>
        {/* Add more admin section cards here */}
      </div>
    </div>
  );
};

export default AdminDashboard; 