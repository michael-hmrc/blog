import React from 'react';
import { render, screen } from '@testing-library/react';
import CreateBlogPost from '../../../src/views/pages/CreateBlogPostPage';

// Mock the child components
jest.mock('../../../src/views/components/navigation_bar/NavBar', () => () => <div data-testid="navbar">Navbar</div>);
jest.mock('../../../src/views/components/Copyright', () => () => <div data-testid="copyright">© 2024 Your Company</div>);
jest.mock('../../../src/views/components/general/H1', () => (props: { id: string; message: string }) => <h1 id={props.id}>{props.message}</h1>);
jest.mock('../../../src/views/components/PostCreator', () => () => <div data-testid="post-creator">PostCreator Component</div>);

describe('CreateBlogPost Component', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it('should render the H1 title with the correct message', () => {
      render(<CreateBlogPost />);
      const title = screen.getByRole('heading', { name: /Create a new blog post/i });
      expect(title).toBeInTheDocument();
    });
  
    it('should render the PostCreator component', () => {
      render(<CreateBlogPost />);
      const postCreator = screen.getByTestId('post-creator');
      expect(postCreator).toBeInTheDocument();
    });
  
    it('should render the Copyright component', () => {
      render(<CreateBlogPost />);
      const copyright = screen.getByTestId('copyright');
      expect(copyright).toBeInTheDocument();
    });
  });