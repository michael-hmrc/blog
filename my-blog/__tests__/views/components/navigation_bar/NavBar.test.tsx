import { act, renderHook } from '@testing-library/react';
import { left, right } from 'fp-ts/lib/Either';
import { none, some } from 'fp-ts/lib/Option';
import NavbarPages from '../../../../src/models/ADTs/NavbarPages';
import UserTypes from '../../../../src/models/ADTs/UserType';
import UserTypeErrors from '../../../../src/models/ADTs/UserTypeErrors';
import AuthService from '../../../../src/service/AuthService';
import { fetchUserRole, generateLinkClassName, useToggleMenu } from '../../../../src/views/components/navigation_bar/NavBar';


jest.mock('../../../../src/service/AuthService');

describe('Navbar utility functions', () => {

  // Test for generating link class names
  describe('generateLinkClassName', () => {
    it('generates correct class names for active links', () => {
      const className = generateLinkClassName(NavbarPages.Home, NavbarPages.Home);
      expect(className).toContain('text-2xl text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-pink-600 animate-bounce hover:text-pink-200');
      expect(className).toContain('animate-bounce');
    });

    it('generates correct class names for inactive links', () => {
      const className = generateLinkClassName(NavbarPages.About, NavbarPages.Home);
      expect(className).toContain('text-black');
      expect(className).toContain('hover:text-gray-500');
    });

    it('returns different styles for Home and other links', () => {
      const homeClassName = generateLinkClassName(NavbarPages.Home, NavbarPages.Home);
      const aboutClassName = generateLinkClassName(NavbarPages.About, NavbarPages.About);
      expect(homeClassName).toContain('text-2xl text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-pink-600 animate-bounce hover:text-pink-200');
    });
  });

  // Test for the menu toggle hook
  describe('useToggleMenu', () => {
    it('toggles the menu visibility', () => {
      const { result } = renderHook(() => useToggleMenu());

      // Initially, isOpen should be false
      expect(result.current.isOpen).toBe(false);

      // After toggling, isOpen should become true
      act(() => {
        result.current.toggleMenu();
      });
      expect(result.current.isOpen).toBe(true);

      // Toggle again and it should go back to false
      act(() => {
        result.current.toggleMenu();
      });
      expect(result.current.isOpen).toBe(false);
    });
  });

  // Test for fetching the user role and handling different cases
  describe('fetchUserRole', () => {
    it('sets content correctly for Admin role', async () => {
      (AuthService.getRole as jest.Mock).mockResolvedValue(right(UserTypes.Admin));

      const setUserBasedContent = jest.fn();
      await fetchUserRole(setUserBasedContent);

      expect(setUserBasedContent).toHaveBeenCalledWith(
        some(<p className="text-lg text-pink-500 text-right">Logged in as Admin</p>)
      );
    });

    it('sets content correctly for Viewer role', async () => {
      (AuthService.getRole as jest.Mock).mockResolvedValue(right(UserTypes.Viewer));

      const setUserBasedContent = jest.fn();
      await fetchUserRole(setUserBasedContent);

      expect(setUserBasedContent).toHaveBeenCalledWith(
        some(<p className="text-lg text-pink-500 text-right">Logged in as Viewer</p>)
      );
    });

    it('sets content to none when role fetching fails', async () => {
      (AuthService.getRole as jest.Mock).mockResolvedValue(left(UserTypeErrors.UnknownUserType));

      const setUserBasedContent = jest.fn();
      await fetchUserRole(setUserBasedContent);

      expect(setUserBasedContent).toHaveBeenCalledWith(none);
    });

    it('sets content to none for unexpected roles', async () => {

      (AuthService.getRole as jest.Mock).mockResolvedValue(right('UnknownRole' as unknown as UserTypes)); // Simulate unexpected role

      const setUserBasedContent = jest.fn();
      await fetchUserRole(setUserBasedContent);

      expect(setUserBasedContent).toHaveBeenCalledWith(none);
    });
  });
});
