import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { none, some } from 'fp-ts/Option';
import BlogPostConnector from '../../../src/connectors/BlogPostConnector';
import UseDeleteBlogPost from '../../../src/hooks/UseDeleteBlogPost';
import { DeleteResponseBody } from '../../../src/models/DeleteResponseBody';
import { PostData } from '../../../src/models/PostData';
import BlogPostPage from '../../../src/views/blog/BlogPostPage';
import axios from 'axios';

// Mock components to focus on BlogPostPage functionality
jest.mock('../../../src/views/components/navigation_bar/NavBar', () => () => <div>Navbar</div>);
jest.mock('../../../src/views/components/Copyright', () => () => <div>Copyright</div>);
jest.mock('../../../src/views/blog/RenderBlogPost', () => ({ post, loading, errorMessage }) => (
  <div>
    {loading._tag === 'Some' && loading.value ? (
      <div>Loading...</div>
    ) : errorMessage._tag === 'Some' ? (
      <div>Error: {errorMessage.value}</div>
    ) : (
      <div>Rendered Post</div>
    )}
  </div>
));

jest.mock('../../../src/views/components/buttons/EditBlogPostButton', () => () => <button>Edit</button>);
jest.mock('../../../src/views/components/buttons/DeleteBlogPostButton', () => ({ handleDelete, loading, errorMessage }) => (
  <div>
    <button onClick={handleDelete}>Delete</button>
    {loading._tag === 'Some' && loading.value && <div>Deleting...</div>}
    {errorMessage._tag === 'Some' && <div>Error: {errorMessage.value}</div>}
  </div>
));

// Mock RoleProtected, placing UserTypes.Admin inside the mock to avoid out-of-scope variable error
jest.mock('../../../src/contexts/RoleProtected', () => ({
  __esModule: true,
  default: ({ children, roles }: { children: React.ReactNode; roles: string[] }) => {
    const UserTypes = require('../../../src/models/ADTs/UserType').default;
    return roles.includes(UserTypes.Admin) ? <div>{children}</div> : null;
  },
}));

// Mock the UseDeleteBlogPost hook
jest.mock('../../../src/hooks/UseDeleteBlogPost');

// Mock the useParams hook from react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: 'test-post-id' }),
}));

// Mock Axios to prevent real network requests
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Add mock response for the user role fetching
mockedAxios.get.mockResolvedValue({
  data: { role: 'admin' }, // Simulate that the user has an admin role
});

describe('BlogPostPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();

     // Add a default mock for the UseDeleteBlogPost hook
     (UseDeleteBlogPost as jest.Mock).mockReturnValue({
      handleDelete: jest.fn(),
      loadingState: none,
      deleteErrorMessage: none,
      deleteResponseBody: none,
    });
  });

  it('renders the Copyright', () => {

    render(<BlogPostPage post={none} loading={some(false)} errorMessage={none} />);
    expect(screen.getByText('Copyright')).toBeInTheDocument();
  });

  it('renders the loading state when loading is true', () => {
    render(<BlogPostPage post={none} loading={some(true)} errorMessage={none} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders the error message when there is an error', () => {
    const error = 'Error loading post';
    render(<BlogPostPage post={none} loading={some(false)} errorMessage={some(error)} />);
    expect(screen.getByText(`Error: ${error}`)).toBeInTheDocument();
  });

  it('renders the blog post when available', () => {
    // Mock PostData matching the correct interface
    const mockPost: PostData = {
      id: 1,
      post_id: 'test-post-id',
      title: 'Test Post',
      body: 'This is the content of the test post.',
      created_at: new Date('2023-09-01T12:00:00Z'),
      updated_at: new Date('2023-09-05T12:00:00Z'),
    };

    render(<BlogPostPage post={some(mockPost)} loading={some(false)} errorMessage={none} />);
    expect(screen.getByText('Rendered Post')).toBeInTheDocument();
  });

  it('renders Edit and Delete buttons for admin users', () => {
    render(<BlogPostPage post={none} loading={some(false)} errorMessage={none} />);
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('calls handleDelete and handles the success case', async () => {
    const mockDeleteResponseBody: DeleteResponseBody = { success: true, message: 'Post deleted successfully' };

    // Mock BlogPostConnector to simulate the delete action
    jest.spyOn(BlogPostConnector, 'deleteBlogPost').mockResolvedValue({
      data: mockDeleteResponseBody,
      error: null,
    });

    const mockHandleDelete = jest.fn();

    (UseDeleteBlogPost as jest.Mock).mockReturnValue({
      handleDelete: mockHandleDelete,
      loadingState: some(true),
      deleteErrorMessage: none,
      deleteResponseBody: some(mockDeleteResponseBody),
    });

    render(<BlogPostPage post={none} loading={some(false)} errorMessage={none} />);

    fireEvent.click(screen.getByText('Delete'));
    expect(mockHandleDelete).toHaveBeenCalledTimes(1);

    // Simulate async wait after deletion
    await waitFor(() => {
      expect(screen.getByText(/Deleting.../i)).toBeInTheDocument();
      // TODO: Fix the message or delete test
      // expect(screen.queryByText(/Deleting.../i)).not.toBeInTheDocument(); // Ensure loading disappears 
    });
  });

  it('displays delete error message when deletion fails', async () => {
    const mockErrorMessage = 'Failed to delete the post';

    // Mock BlogPostConnector to simulate an error during delete
    jest.spyOn(BlogPostConnector, 'deleteBlogPost').mockResolvedValue({
      data: null,
      error: mockErrorMessage,
    });

    const mockHandleDelete = jest.fn();

    (UseDeleteBlogPost as jest.Mock).mockReturnValue({
      handleDelete: mockHandleDelete,
      loadingState: some(false),
      deleteErrorMessage: some(mockErrorMessage),
      deleteResponseBody: none,
    });

    render(<BlogPostPage post={none} loading={some(false)} errorMessage={none} />);

    fireEvent.click(screen.getByText('Delete'));

    await waitFor(() => {
      expect(screen.getByText(`Error: ${mockErrorMessage}`)).toBeInTheDocument();
    });
  });

  it('displays loading state when delete is in progress', async () => {
    const mockHandleDelete = jest.fn();

    (UseDeleteBlogPost as jest.Mock).mockReturnValue({
      handleDelete: mockHandleDelete,
      loadingState: some(true),
      deleteErrorMessage: none,
      deleteResponseBody: none,
    });

    render(<BlogPostPage post={none} loading={some(false)} errorMessage={none} />);

    fireEvent.click(screen.getByText('Delete'));

    expect(screen.getByText(/Deleting.../i)).toBeInTheDocument();

    // await waitFor(() => {
    //   expect(screen.queryByText(/Deleting.../i)).not.toBeInTheDocument(); // Ensure loading disappears after deletion
    // });
  });


});
