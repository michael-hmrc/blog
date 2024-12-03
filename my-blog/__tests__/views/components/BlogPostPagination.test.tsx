import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BlogPostPagination from '../../../src/views/components/BlogPostPagination';

describe('BlogPostPagination Component', () => {
  it('renders the correct number of page buttons', () => {
    render(<BlogPostPagination postsPerPage={10} totalPosts={50} paginate={jest.fn()} currentPage={1} />);
    
    // We expect 5 buttons (since 50 / 10 = 5)
    const pageButtons = screen.getAllByTestId('page-buttons');
    expect(pageButtons).toHaveLength(5);
  });

  it('renders the correct page numbers', () => {
    render(<BlogPostPagination postsPerPage={10} totalPosts={30} paginate={jest.fn()} currentPage={0} />);
    
    // Page numbers should be 1, 2, 3 (since 30 / 10 = 3)
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('calls paginate function with correct page number when a button is clicked', () => {
    const mockPaginate = jest.fn();
    render(<BlogPostPagination postsPerPage={10} totalPosts={30} paginate={mockPaginate} currentPage={0} />);
    
    const secondPageButton = screen.getByText('2');
    fireEvent.click(secondPageButton);

    expect(mockPaginate).toHaveBeenCalledWith(2);
  });

  it('renders buttons with correct styles', () => {
    render(<BlogPostPagination postsPerPage={5} totalPosts={20} paginate={jest.fn()} currentPage={0} />);
    
    const pageButtonOne = screen.getByText('1');
    expect(pageButtonOne).toHaveClass('px-2 py-1 text-base rounded text-gray-500 hover:bg-blue-200');
    const pageButtonTwo = screen.getByText('2');
    expect(pageButtonTwo).toHaveClass('px-2 py-1 text-base rounded text-gray-500 hover:bg-blue-200');
  });
});
