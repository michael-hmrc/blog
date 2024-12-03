// src/pages/About.tsx
import React from 'react';
import Copyright from '../components/Copyright';
import H1 from '../components/general/H1';
import Navbar from '../components/navigation_bar/NavBar';
import PostCreator from '../components/PostCreator';
import Spacer from '../components/Spacer';

const CreateBlogPostPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen font-nunito bg-gray-100">
      <Spacer size='pb-20' />
      <H1 id={"create-post"} message={"Create a new blog post"} className={""} />
      <div className="flex-grow container mx-auto p-4">
        <PostCreator />
      </div>
      <Copyright />
    </div>
  );
};

export default CreateBlogPostPage;
