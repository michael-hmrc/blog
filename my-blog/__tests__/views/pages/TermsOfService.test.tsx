// __tests__/TermsOfService.test.tsx

import { fireEvent, render, screen } from '@testing-library/react';
import Copyright from '../../../src/views/components/Copyright';
import Navbar from '../../../src/views/components/navigation_bar/NavBar';
import TermsOfService from '../../../src/views/pages/TermsOfServicePage';

// Mock the Navbar and Copyright components
jest.mock('../../../src/views/components/navigation_bar/NavBar', () => () => <div data-testid="navbar">Navbar</div>);
jest.mock('../../../src/views/components/Copyright', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="copyright">© 2024 Your Company</div>,
  };
});

describe('TermsOfService Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the H1 title with "Terms Of Service"', () => {
    render(<TermsOfService />);
    const title = screen.getByRole('heading', { name: /Terms Of Service/i });
    expect(title).toBeInTheDocument();
  });

  it('should render all Accordion titles', () => {
    render(<TermsOfService />);
    const accordionTitles = [
      '1. Personal Use Only',
      '2. Content Ownership',
      '3. User Conduct',
      '4. Privacy',
      '5. External Links',
      '6. Disclaimer',
      '7. Changes to the Terms',
    ];

    accordionTitles.forEach((title) => {
      const accordionTitle = screen.getByRole('button', { name: new RegExp(title) });
      expect(accordionTitle).toBeInTheDocument();
    });
  });

  it('should not display any Accordion content initially', () => {
    render(<TermsOfService />);
    const contents = [
      'Welcome to my personal blog! This blog is created for personal use only, where I share my thoughts, experiences, and other content I find interesting. By accessing or using this blog, you agree to comply with and be bound by the following terms and conditions.',
      'All content on this blog, including text, images, and other media, is the property of the blog owner unless otherwise stated. You may not reproduce, distribute, or use the content for commercial purposes without explicit permission from the owner.',
      'While commenting on or interacting with the blog, users are expected to conduct themselves respectfully and lawfully. Any inappropriate, offensive, or illegal behavior may result in the removal of comments and/or blocking of users.',
      'Your privacy is important to me. Any personal information you provide, such as through comments or subscriptions, will be handled with care and will not be shared with third parties without your consent unless required by law.',
      'This blog may contain links to external websites that are not controlled or operated by me. I am not responsible for the content or practices of these external sites. Visiting these links is at your own risk.',
      'The content provided on this blog is for informational purposes only and reflects my personal opinions and experiences. I make no representations or warranties regarding the accuracy or completeness of the content. The blog is provided on an "as-is" basis, and I disclaim any liability for any errors or omissions.',
      'I reserve the right to modify these terms of service at any time. Any changes will be posted on this page, and your continued use of the blog constitutes acceptance of the updated terms.',
    ];

    contents.forEach((content) => {
      expect(screen.queryByText(content)).not.toBeInTheDocument();
    });
  });

  it('should toggle Accordion content when clicked', () => {
    render(<TermsOfService />);
    const accordionTitle = screen.getByRole('button', { name: /1\. Personal Use Only/ });

    // Initially, content is not visible
    const contentText = 'Welcome to my personal blog! This blog is created for personal use only, where I share my thoughts, experiences, and other content I find interesting. By accessing or using this blog, you agree to comply with and be bound by the following terms and conditions.';
    expect(screen.queryByText(contentText)).not.toBeInTheDocument();

    // Click to open
    fireEvent.click(accordionTitle);
    expect(screen.getByText(contentText)).toBeInTheDocument();

    // Click to close
    fireEvent.click(accordionTitle);
    expect(screen.queryByText(contentText)).not.toBeInTheDocument();
  });

  it('should allow multiple Accordions to be opened independently', () => {
    render(<TermsOfService />);
    const firstAccordionTitle = screen.getByRole('button', { name: /1\. Personal Use Only/ });
    const secondAccordionTitle = screen.getByRole('button', { name: /2\. Content Ownership/ });

    const firstContent = 'Welcome to my personal blog! This blog is created for personal use only, where I share my thoughts, experiences, and other content I find interesting. By accessing or using this blog, you agree to comply with and be bound by the following terms and conditions.';
    const secondContent = 'All content on this blog, including text, images, and other media, is the property of the blog owner unless otherwise stated. You may not reproduce, distribute, or use the content for commercial purposes without explicit permission from the owner.';

    // Open first accordion
    fireEvent.click(firstAccordionTitle);
    expect(screen.getByText(firstContent)).toBeInTheDocument();
    expect(screen.queryByText(secondContent)).not.toBeInTheDocument();

    // Open second accordion
    fireEvent.click(secondAccordionTitle);
    expect(screen.getByText(firstContent)).toBeInTheDocument();
    expect(screen.getByText(secondContent)).toBeInTheDocument();

    // Close first accordion
    fireEvent.click(firstAccordionTitle);
    expect(screen.queryByText(firstContent)).not.toBeInTheDocument();
    expect(screen.getByText(secondContent)).toBeInTheDocument();
  });

  it('should render the Copyright component', () => {
    render(<TermsOfService />);
    const copyright = screen.getByTestId('copyright');
    expect(copyright).toBeInTheDocument();
  });
});
