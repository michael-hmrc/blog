import { Option } from 'fp-ts/Option';
import React from 'react';
import UseDeleteBlogPost from '../../hooks/UseDeleteBlogPost';
import { PostData } from '../../models/PostData';
import Accordion from '../components/Accordion';
import Copyright from '../components/Copyright';
import DeletePostButton from '../components/buttons/DeletePostButton';
import EditButton from '../components/buttons/EditButton';
import Navbar from '../components/navigation_bar/NavBar';
import RenderBlogPost from './RenderBlogPost';

interface BlogPostPageProps {
  post: Option<PostData>;
  loading: Option<boolean>;
  errorMessage: Option<string>;
}


const BlogPostPage: React.FC<BlogPostPageProps> = ({ post, loading, errorMessage }) => {

  const accordions = [
    {
      title: 'Accordion 1',
      content: 'This is the content of the first accordion.',
    },
    {
      title: 'Accordion 2',
      content: 'This is the content of the second accordion.',
    },
    {
      title: 'Accordion 3',
      content: 'This is the content of the third accordion.',
    },
  ];


  const { handleDelete, loadingState, deleteErrorMessage, deleteResponseBody } = UseDeleteBlogPost();

  return (
    <div className="font-nunito min-h-screen bg-gray-100 flex flex-col">

      <header className="bg-celadon-600 text-raisin-black py-4">
        <Navbar />
      </header>

      <main className="container mx-auto p-4 flex-grow max-w-4xl px-8">
        <div className="flex flex-col space-y-4">
          {accordions.map((accordion, index) => (
            <Accordion key={index} title={accordion.title} content={accordion.content} />
          ))}          <RenderBlogPost post={post} loading={loading} errorMessage={errorMessage} />
          <EditButton />
          <div className="flex space-x-4">
            <DeletePostButton handleDelete={handleDelete} loading={loadingState} errorMessage={deleteErrorMessage} deleteResponseBody={deleteResponseBody} />
          </div>
        </div>
      </main>

      <footer>
        <Copyright />
      </footer>
    </div>
  );
};

export default BlogPostPage;
