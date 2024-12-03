import { render, screen } from '@testing-library/react';
import { messages } from '../../../src/messages/about';
import AboutPage from '../../../src/views/pages/AboutPage';

// Mock the Navbar and Copyright components
jest.mock('../../../src/views/components/navigation_bar/NavBar', () => () => <div data-testid="navbar">Navbar</div>);
jest.mock('../../../src/views/components/Copyright', () => () => <div data-testid="copyright">© 2024 Your Company</div>);

describe('AboutPage Component', () => {
  
    it('should render all paragraphs with the correct text', () => {
      render(<AboutPage />);
      const paragraphs = [
        messages.lorem.p1,
        messages.lorem.p2,
        messages.lorem.p3,
        messages.lorem.p4,
        messages.lorem.p5,
      ];
  
      paragraphs.forEach(text => {
        const paragraphElements = screen.getAllByText(text);
        expect(paragraphElements.length).toBeGreaterThan(0);  // Ensure at least one element contains the text
      });
    });
  
    it('should render the Copyright component', () => {
      render(<AboutPage />);
      const copyright = screen.getByTestId('copyright');
      expect(copyright).toBeInTheDocument();
    });
  });