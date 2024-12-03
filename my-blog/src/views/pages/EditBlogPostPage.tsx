// src/pages/About.tsx
import React from 'react';
import Copyright from '../components/Copyright';
import EditPostForm from '../components/EditPostForm';
import H1 from '../components/general/H1';
import Navbar from '../components/navigation_bar/NavBar';

const EditBlogPostPage: React.FC = () => {

  return (
    <div className="flex flex-col min-h-screen font-nunito bg-gray-100">
      <div className="flex-grow container mx-auto p-4">
        <H1 id={'edit-a-blog-post'} message={'Edit a blog post'} className={''} />
        <EditPostForm />
      </div>
      <Copyright />
    </div>
  );
};

export default EditBlogPostPage;
