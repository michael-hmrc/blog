import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { PostData } from '../../../src/models/PostData';
import { filterPosts, paginatePosts, renderBlogList } from '../../../src/views/pages/LandingPage';

describe('filterPosts', () => {
  const posts: PostData[] = [
    { id: 1, post_id: "post-1", title: 'React Basics', body: 'Introduction to React', created_at: new Date(), updated_at: new Date() },
    { id: 2, post_id: "post-2", title: 'Advanced React', body: 'Deep dive into React', created_at: new Date(), updated_at: new Date() },
  ];

  it('should return all posts when query is empty', () => {
    const filteredPosts = filterPosts(posts, '');
    expect(filteredPosts).toEqual(posts);
  });

  it('should return filtered posts based on query', () => {
    const filteredPosts = filterPosts(posts, 'advanced');
    expect(filteredPosts.length).toBe(1);
    expect(filteredPosts[0].title).toBe('Advanced React');
  });

  // New Test: Case-insensitive query matching
  it('should return filtered posts with case-insensitive matching', () => {
    const filteredPosts = filterPosts(posts, 'react');
    expect(filteredPosts.length).toBe(2);
    expect(filteredPosts[0].title).toBe('React Basics');
  });

  // New Test: No match found
  it('should return an empty array when no posts match the query', () => {
    const filteredPosts = filterPosts(posts, 'non-existent');
    expect(filteredPosts.length).toBe(0);
  });
});

describe('paginatePosts', () => {
  const posts: PostData[] = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    post_id: `post-${i + 1}`,
    title: `Post ${i + 1}`,
    body: `This is post ${i + 1}`,
    created_at: new Date(),
    updated_at: new Date(),
  }));

  it('should return correct posts for the first page', () => {
    const paginatedPosts = paginatePosts(posts, 1, 5);
    expect(paginatedPosts.length).toBe(5);
    expect(paginatedPosts[0].title).toBe('Post 1');
  });

  it('should return correct posts for the second page', () => {
    const paginatedPosts = paginatePosts(posts, 2, 5);
    expect(paginatedPosts.length).toBe(5);
    expect(paginatedPosts[0].title).toBe('Post 6');
  });

  // New Test: Pagination with fewer posts than page limit
  it('should return all posts when total posts are fewer than postsPerPage', () => {
    const smallPosts = posts.slice(0, 3); // Only 3 posts
    const paginatedPosts = paginatePosts(smallPosts, 1, 5);
    expect(paginatedPosts.length).toBe(3);
  });

  // New Test: Out of bounds page number
  it('should return an empty array if page number exceeds total pages', () => {
    const paginatedPosts = paginatePosts(posts, 3, 5); // There are only 2 pages, page 3 is out of bounds
    expect(paginatedPosts.length).toBe(0);
  });
});

describe('renderBlogList', () => {
  const posts: PostData[] = [
    { id: 1, post_id: "post-1", title: 'React Basics', body: 'Introduction to React', created_at: new Date(), updated_at: new Date() },
  ];

  it('should render no posts message when no posts are available', () => {
    const { getByText } = render(renderBlogList([]));
    expect(getByText('No blog posts found.')).toBeInTheDocument();
  });

  it('should render blog list when posts are available', () => {
    const { getByText } = render(
      <MemoryRouter>
        {renderBlogList(posts)}
      </MemoryRouter>
    );
    expect(getByText('React Basics')).toBeInTheDocument();
  });

  // New Test: Rendering multiple posts
  it('should render multiple posts when they are available', () => {
    const multiplePosts: PostData[] = [
      { id: 1, post_id: "post-1", title: 'React Basics', body: 'Introduction to React', created_at: new Date(), updated_at: new Date() },
      { id: 2, post_id: "post-2", title: 'Advanced React', body: 'Deep dive into React', created_at: new Date(), updated_at: new Date() },
    ];

    const { getByText } = render(
      <MemoryRouter>
        {renderBlogList(multiplePosts)}
      </MemoryRouter>
    );

    expect(getByText('React Basics')).toBeInTheDocument();
    expect(getByText('Advanced React')).toBeInTheDocument();
  });

  // New Test: Empty titles and bodies handling
  it('should render posts with empty title and body gracefully', () => {
    const postNoContent: PostData[] = [
      { id: 1, post_id: "post-1", title: '', body: '', created_at: new Date(), updated_at: new Date() },
    ];

    const { container } = render(
      <MemoryRouter>
        {renderBlogList(postNoContent)}
      </MemoryRouter>
    );

    expect(container.textContent).toContain('Read more');
  });
});
