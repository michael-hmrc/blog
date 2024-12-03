import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { PostData } from '../../models/PostData';
import BlogList from '../blog/BlogList';
import BlogPostPagination from '../components/BlogPostPagination';
import DeleteAllBlogPostsButton from '../components/buttons/DeleteAllBlogPostsButton';
import Copyright from '../components/Copyright';
import SearchBar from '../components/SearchBar';
import Spacer from '../components/Spacer';

interface LandingPageProps {
  posts: PostData[];
}

const LandingPage: React.FC<LandingPageProps> = ({ posts }) => {
  const postsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [post, setPost] = useState<PostData[]>(posts); // Initialize posts state with the posts prop

  const filteredPosts = filterPosts(posts, searchQuery);
  const currentPosts = paginatePosts(filteredPosts, currentPage, postsPerPage);

  return (
    <div className="font-nunito min-h-screen bg-stone-300">
      <main className="container mx-auto p-10">
        <Spacer size="p-10" />

        {/* Search Bar */}
        <div className="w-full md:w-2/3 lg:w-1/3 mx-auto">
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>

        {/* Blog Posts Section */}
        <div className="flex flex-grow container mx-auto font-nunito min-h-screen bg-stone-300">
          <div className="w-full md:w-3/4 lg:w-2/3 mx-auto">
            {renderBlogList(currentPosts)}
            <BlogPostPagination
              postsPerPage={postsPerPage}
              currentPage={currentPage}
              totalPosts={filteredPosts.length}
              paginate={setCurrentPage}
            />
          </div>
        </div>

        {/* Delete Blog Posts Button */}
        <div className="flex justify-start pt-4 sm:p-4">
          <DeleteAllBlogPostsButton posts={post} setPosts={setPost} />
        </div>
      </main>

      <Copyright />
      <ToastContainer />
    </div>
  );
};

// Separate post filtering logic
export const filterPosts = (posts: PostData[], query: string): PostData[] => {
  if (!query) return posts;
  return posts.filter((post) =>
    post.title.toLowerCase().includes(query.toLowerCase())
  );
};

// Pagination logic in a separate function
export const paginatePosts = (
  posts: PostData[],
  currentPage: number,
  postsPerPage: number
): PostData[] => {
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  return posts.slice(indexOfFirstPost, indexOfLastPost);
};

// Separate rendering logic for the blog list
export const renderBlogList = (posts: PostData[]): JSX.Element => {
  if (posts.length === 0) {
    return <p className="text-center text-gray-500">No blog posts found.</p>;
  }
  return <BlogList posts={posts} />;
};

export default LandingPage;
