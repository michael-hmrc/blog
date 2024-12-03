import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import App from '../src/App';
import { UserRoleProvider } from '../src/contexts/UserRoleContext';
import axios from 'axios';

// Mock the components to verify their rendering
jest.mock('../src/controllers/BlogPostController', () => () => <div>BlogPostController Component</div>);
jest.mock('../src/controllers/CreateUserController', () => () => <div>CreateUserController Component</div>);
jest.mock('../src/controllers/CreateSkillsController', () => () => <div>CreateSkillsController Component</div>);
jest.mock('../src/controllers/CreateWorklogController', () => () => <div>CreateWorklogController Component</div>);
jest.mock('../src/controllers/EditSkillsPageController', () => () => <div>EditSkillsPageController Component</div>);
jest.mock('../src/controllers/EditWorklogPageController', () => () => <div>EditWorklogPageController Component</div>);
jest.mock('../src/controllers/ForgottenPasswordController', () => () => <div>ForgottenPasswordController Component</div>);
jest.mock('../src/controllers/LandingPageController', () => () => <div>LandingPageController Component</div>);
jest.mock('../src/controllers/LoginController', () => () => <div>LoginController Component</div>);
jest.mock('../src/controllers/ShowSkillsPageController', () => () => <div>ShowSkillsPageController Component</div>);
jest.mock('../src/controllers/ShowWorklogsPageController', () => () => <div>ShowWorklogsPageController Component</div>);
jest.mock('../src/views/pages/AboutPage', () => () => <div>AboutPage Component</div>);
jest.mock('../src/views/pages/assets_pages/ButtonsPage', () => () => <div>ButtonsPage Component</div>);
jest.mock('../src/views/pages/assets_pages/CheckboxesPage', () => () => <div>CheckboxesPage Component</div>);
jest.mock('../src/views/pages/assets_pages/FormsPage', () => () => <div>FormsPage Component</div>);
jest.mock('../src/views/pages/assets_pages/ImagesPage', () => () => <div>ImagesPage Component</div>);
jest.mock('../src/views/pages/assets_pages/LoadingPage', () => () => <div>LoadingPage Component</div>);
jest.mock('../src/views/pages/assets_pages/RadioPage', () => () => <div>RadioPage Component</div>);
jest.mock('../src/views/pages/assets_pages/VideosPage', () => () => <div>VideosPage Component</div>);

jest.mock('../src/views/pages/ContactsPage', () => () => <div>ContactsPage Component</div>);
jest.mock('../src/views/pages/CreateBlogPostPage', () => () => <div>CreateBlogPostPage Component</div>);
jest.mock('../src/views/pages/EditBlogPostPage', () => () => <div>EditBlogPostPage Component</div>);
jest.mock('../src/views/pages/InterestsPage', () => () => <div>InterestsPage Component</div>);
jest.mock('../src/views/pages/PrivacyPolicyPage', () => () => <div>PrivacyPolicyPage Component</div>);
jest.mock('../src/views/pages/TermsOfServicePage', () => () => <div>TermsOfServicePage Component</div>);
jest.mock('../src/views/pages/UnauthorizedPage', () => () => <div>UnauthorizedPage Component</div>);
jest.mock('../src/views/components/navigation_bar/NavBar', () => () => <div>Navbar Component</div>);

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('App component', () => {
  const renderWithAuthProvider = (ui: React.ReactElement, { route = '/' } = {}) => {
    return render(
      <MemoryRouter initialEntries={[route]}>
        <UserRoleProvider>
          {ui}
        </UserRoleProvider>
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    mockedAxios.get.mockClear();
  });

  test('renders LandingPage component for the root route', async () => {
    renderWithAuthProvider(<App />);

    await waitFor(() => {
      expect(screen.getByText('LandingPageController Component')).toBeInTheDocument();
    });
  });

  test('renders AboutPage component for /about route', async () => {
    renderWithAuthProvider(<App />, { route: '/about' });

    await waitFor(() => {
      expect(screen.getByText('AboutPage Component')).toBeInTheDocument();
    });
  });

  test('renders CreateBlogPostPage component for /create-blog-post route with admin role', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: { role: 'admin' } });

    renderWithAuthProvider(<App />, { route: '/create-blog-post' });

    await waitFor(() => {
      expect(screen.getByText('CreateBlogPostPage Component')).toBeInTheDocument();
    });
  });

  test('renders UnauthorizedPage component for /create-blog-post route without admin role', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: { role: 'user' } });

    renderWithAuthProvider(<App />, { route: '/create-blog-post' });

    await waitFor(() => {
      expect(screen.getByText('UnauthorizedPage Component')).toBeInTheDocument();
    });
  });

  test('renders BlogPostController component for /post/:id route', async () => {
    renderWithAuthProvider(<App />, { route: '/post/1' });

    await waitFor(() => {
      expect(screen.getByText('BlogPostController Component')).toBeInTheDocument();
    });
  });

  test('renders ShowSkillsPageController component for /skills route', async () => {
    renderWithAuthProvider(<App />, { route: '/skills' });

    await waitFor(() => {
      expect(screen.getByText('ShowSkillsPageController Component')).toBeInTheDocument();
    });
  });

  test('renders CreateSkillsController component for /create/skill route with admin role', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: { role: 'admin' } });

    renderWithAuthProvider(<App />, { route: '/create/skill' });

    await waitFor(() => {
      expect(screen.getByText('CreateSkillsController Component')).toBeInTheDocument();
    });
  });

  test('renders ShowWorklogsPageController component for /worklog route', async () => {
    renderWithAuthProvider(<App />, { route: '/worklog' });

    await waitFor(() => {
      expect(screen.getByText('ShowWorklogsPageController Component')).toBeInTheDocument();
    });
  });

  test('renders CreateWorklogController component for /worklog/add/new/worklog route with admin role', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: { role: 'admin' } });

    renderWithAuthProvider(<App />, { route: '/worklog/add/new/worklog' });

    await waitFor(() => {
      expect(screen.getByText('CreateWorklogController Component')).toBeInTheDocument();
    });
  });

  test('renders UnauthorizedPage component for /worklog/add/new/worklog route without admin role', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: { role: 'user' } });

    renderWithAuthProvider(<App />, { route: '/worklog/add/new/worklog' });

    await waitFor(() => {
      expect(screen.getByText('UnauthorizedPage Component')).toBeInTheDocument();
    });
  });

  // test('renders 404 page for invalid routes', async () => {
  //   renderWithAuthProvider(<App />, { route: '/non-existing-route' });

  //   await waitFor(() => {
  //     expect(screen.getByText('404 Not Found')).toBeInTheDocument();
  //   });
  // });
});
