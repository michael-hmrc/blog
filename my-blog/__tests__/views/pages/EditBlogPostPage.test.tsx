import { render, screen } from '@testing-library/react';
import EditBlogPostPage from '../../../src/views/pages/EditBlogPostPage';


// Mock the child components
jest.mock('../../../src/views/components/navigation_bar/NavBar', () => () => <div data-testid="navbar">Navbar</div>);
jest.mock('../../../src/views/components/Copyright', () => () => <div data-testid="copyright">© 2024 Your Company</div>);
jest.mock('../../../src/views/components/general/H1', () => (props: { id: string; message: string }) => <h1 id={props.id}>{props.message}</h1>);
jest.mock('../../../src/views/components/EditPostForm', () => () => <div data-testid="edit-post-form">EditPostForm Component</div>);

describe('EditBlogPost Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the H1 title with the correct message', () => {
    render(<EditBlogPostPage />);
    const title = screen.getByRole('heading', { name: /Edit a blog post/i });
    expect(title).toBeInTheDocument();
  });

  it('should render the EditPostForm component', () => {
    render(<EditBlogPostPage />);
    const editPostForm = screen.getByTestId('edit-post-form');
    expect(editPostForm).toBeInTheDocument();
  });

  it('should render the Copyright component', () => {
    render(<EditBlogPostPage />);
    const copyright = screen.getByTestId('copyright');
    expect(copyright).toBeInTheDocument();
  });
});
