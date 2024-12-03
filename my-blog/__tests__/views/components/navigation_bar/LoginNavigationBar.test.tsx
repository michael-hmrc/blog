import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginNavbarPages from '../../../../src/models/ADTs/LoginNavbarPages';
import LoginNavigationbar from '../../../../src/views/components/navigation_bar/LoginNavigationBar';


describe('LoginNavigationbar', () => {
  test('renders navigation links correctly', () => {
    render(
      <MemoryRouter>
        <LoginNavigationbar />
      </MemoryRouter>
    );

    // Check if the Home link is present
    expect(screen.getByText('Home')).toBeInTheDocument();

    // Check if the Login link is present
    expect(screen.getByText('Login')).toBeInTheDocument();

    // Check if the Create Account link is present
    expect(screen.getByText('Create Account')).toBeInTheDocument();

    // Check if the Forgotten Password link is present
    expect(screen.getByText('Forgotten Password')).toBeInTheDocument();
  });

  test('applies active class for the Login link when LoginNavbarPages.Login is active', () => {
    render(
      <MemoryRouter>
        <LoginNavigationbar page={LoginNavbarPages.Login} />
      </MemoryRouter>
    );

    // Check if the "Login" link has the active class
    const loginLink = screen.getByText('Login');
    expect(loginLink).toHaveClass(
      'text-xl text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-pink-600 animate-bounce hover:text-pink-200'
    );
  });

  //TODO: Fix test
  // test('toggles mobile menu when button is clicked', () => {
  //   render(
  //     <MemoryRouter>
  //       <LoginNavigationbar />
  //     </MemoryRouter>
  //   );

  //   // Get the button that toggles the menu
  //   const menuButton = screen.getByRole('button');

  //   //TODO: Fix test - Initially, the menu should be hidden
  //   // expect(screen.getByText('Login').closest('div')).toHaveClass('hidden');

  //   // Simulate a click on the menu button
  //   fireEvent.click(menuButton);

  //   // Now the menu should be visible
  //   expect(screen.getByText('Login').closest('div')).toHaveClass('block');

  //   // Simulate another click on the menu button
  //   fireEvent.click(menuButton);

  //   //TODO: Fix test - The menu should be hidden again
  //   // expect(screen.getByText('Login').closest('div')).toHaveClass('hidden');
  // });

  test('renders the correct active link based on the page prop', () => {
    render(
      <MemoryRouter>
        <LoginNavigationbar page={LoginNavbarPages.CreateAccount} />
      </MemoryRouter>
    );

    // Ensure the Create Account link has the active class
    const createAccountLink = screen.getByText('Create Account');
    expect(createAccountLink).toHaveClass(
      'text-xl text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-pink-600 animate-bounce hover:text-pink-200'
    );

    // Ensure other links do not have the active class
    const loginLink = screen.getByText('Login');
    expect(loginLink).not.toHaveClass(
      'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-pink-300 animate-bounce text-xl'
    );
  });
});
