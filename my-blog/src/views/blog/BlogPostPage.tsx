import { Option } from 'fp-ts/Option';
import React from 'react';
import RoleProtected from '../../contexts/RoleProtected';
import { UserRoleProvider } from '../../contexts/UserRoleContext';
import UseDeleteBlogPost from '../../hooks/UseDeleteBlogPost';
import UserTypes from '../../models/ADTs/UserType';
import { PostData } from '../../models/PostData';
import Copyright from '../components/Copyright';
import DeleteBlogPostButton from '../components/buttons/DeleteBlogPostButton';
import EditButton from '../components/buttons/EditBlogPostButton';
import Navbar from '../components/navigation_bar/NavBar';
import RenderBlogPost from './RenderBlogPost';

interface BlogPostPageProps {
  post: Option<PostData>;
  loading: Option<boolean>;
  errorMessage: Option<string>;
}


const BlogPostPage: React.FC<BlogPostPageProps> = ({ post, loading, errorMessage }) => {


  const { handleDelete, loadingState, deleteErrorMessage, deleteResponseBody } = UseDeleteBlogPost();

  return (
    <UserRoleProvider>
      <div className="font-nunito min-h-screen bg-gray-100 flex flex-col">

        <main className="container mx-auto p-4 flex-grow max-w-4xl px-8">
          <div className="flex flex-col space-y-4">
            <RenderBlogPost post={post} loading={loading} errorMessage={errorMessage} />

            <RoleProtected roles={[UserTypes.Admin]}>
              <EditButton />
              <div className="flex space-x-4">
                <DeleteBlogPostButton handleDelete={handleDelete} loading={loadingState} errorMessage={deleteErrorMessage} deleteResponseBody={deleteResponseBody} />
              </div>
            </ RoleProtected>

          </div>
        </main>

        <footer>
          <Copyright />
        </footer>
      </div>
    </UserRoleProvider>
  );
};

export default BlogPostPage;
