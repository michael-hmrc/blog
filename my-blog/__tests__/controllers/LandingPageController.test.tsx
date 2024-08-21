import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LandingPageController from '../../src/controllers/LandingPageController';
import BlogPostConnector from '../../src/connectors/BlogPostConnector';
import { PostData } from '../../src/models/PostData';

// Mocking BlogPostConnector
jest.mock('../../src/connectors/BlogPostConnector');

const mockedBlogPostConnector = BlogPostConnector as jest.Mocked<typeof BlogPostConnector>;

describe('LandingPageController', () => {

    const samplePosts: PostData[] = [
        { id: 1, post_id: "blog-post-1", title: 'Post 1', body: 'Content for post 1' },
        { id: 2, post_id: "blog-post-2", title: 'Post 2', body: 'Content for post 2' },
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders posts when data is successfully fetched', async () => {
        mockedBlogPostConnector.getAllPosts.mockResolvedValueOnce({ data: samplePosts });

        render(
            <MemoryRouter>
                <LandingPageController.onPageLoad />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('Post 1')).toBeInTheDocument();
            expect(screen.getByText('Post 2')).toBeInTheDocument();
        });
    });

    test('renders error message when fetching posts fails', async () => {
        const errorMessage = 'Failed to fetch posts';
        mockedBlogPostConnector.getAllPosts.mockResolvedValueOnce({ error: errorMessage });

        render(
            <MemoryRouter>
                <LandingPageController.onPageLoad />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
        });
    });

    test('renders error message when no posts are retrieved', async () => {
        mockedBlogPostConnector.getAllPosts.mockResolvedValueOnce({ data: [] });

        render(
            <MemoryRouter>
                <LandingPageController.onPageLoad />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText((content, element) =>
                content.startsWith('Error: [LandingPageController][getAllPosts] No blog posts retrieved')
            )).toBeInTheDocument();
        });
    });

});
