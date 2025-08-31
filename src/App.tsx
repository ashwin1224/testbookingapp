import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import BookTest from './pages/BookTest';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import News from './pages/News';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import BlogManager from './pages/admin/blog/BlogManager';
import BlogEditor from './pages/admin/blog/BlogEditor';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/book-test" element={<BookTest />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogDetail />} />
              <Route path="/news" element={<News />} />

              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="manage/blog" element={<BlogManager />} />
                <Route path="manage/blog/edit/:id" element={<BlogEditor />} />
                <Route path="manage/blog/new" element={<BlogEditor />} />
              </Route>
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App; 