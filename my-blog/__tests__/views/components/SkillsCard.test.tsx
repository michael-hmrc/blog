import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RoleProtected from '../../../src/contexts/RoleProtected';
import UseDeleteSkill from '../../../src/hooks/UseDeleteSkill';
import SkillsCard from '../../../src/views/components/skills/SkillsCard';

// Mock dependencies
jest.mock('../../../src/hooks/UseDeleteSkill');
jest.mock('../../../src/contexts/RoleProtected', () => ({ children }) => <div>{children}</div>);

describe('SkillsCard', () => {
  const mockDeleteSkill = jest.fn();
  const mockSkill = {
    id: 1,
    skill_id: '123',
    skill: 'JavaScript',
    description: 'A programming language',
  };

  beforeEach(() => {
    // Mock UseDeleteSkill hook to return predefined values
    UseDeleteSkill.mockReturnValue({
      handleDelete: mockDeleteSkill,
      loadingState: false,
      deleteErrorMessage: '',
      deleteResponseBody: null,
    });
  });

  it('renders the skill and description correctly', () => {
    render(
      <MemoryRouter>
        <SkillsCard {...mockSkill} />
      </MemoryRouter>
    );
    // Check that the skill name and description are rendered
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByText('A programming language')).toBeInTheDocument();
  });

  it('renders Edit and Delete buttons for admin role', async () => {
    // Mock RoleProtected to always render children
    jest.spyOn(RoleProtected, 'render').mockImplementation(({ children }) => children);

    render(
      <MemoryRouter>
        <SkillsCard {...mockSkill} />
      </MemoryRouter>
    );

    // Check for the presence of the Edit and Delete buttons
    await waitFor(() => {
      expect(screen.getByText('Edit')).toBeInTheDocument();
      expect(screen.getByText('Delete')).toBeInTheDocument();
    });
  });

  it('calls handleDelete when the Delete button is clicked', async () => {
    render(
      <MemoryRouter>
        <SkillsCard {...mockSkill} />
      </MemoryRouter>
    );

    // Simulate a click on the Delete button
    const deleteButton = await screen.findByText('Delete');
    fireEvent.click(deleteButton);

    // Check if the handleDelete function was called
    expect(mockDeleteSkill).toHaveBeenCalledTimes(1);
  });

  it('handles loading state correctly on Delete button', () => {
    // Simulate a loading state
    UseDeleteSkill.mockReturnValue({
      handleDelete: mockDeleteSkill,
      loadingState: true,
      deleteErrorMessage: '',
      deleteResponseBody: null,
    });

    render(
      <MemoryRouter>
        <SkillsCard {...mockSkill} />
      </MemoryRouter>
    );

    // Check if the Delete button shows a loading state (e.g., spinner or disabled)
    const deleteButton = screen.getByText('Delete');
    expect(deleteButton).toBeDisabled();
  });

  it('displays an error message if delete fails', () => {
    const errorMessage = 'Failed to delete skill';

    // Mock UseDeleteSkill with an error message
    UseDeleteSkill.mockReturnValue({
      handleDelete: mockDeleteSkill,
      loadingState: false,
      deleteErrorMessage: errorMessage,
      deleteResponseBody: null,
    });

    render(
      <MemoryRouter>
        <SkillsCard {...mockSkill} />
      </MemoryRouter>
    );

    // Check if the error message is displayed
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('handles the absence of user-based content gracefully', () => {
    // If userBasedContent is null, nothing should break
    render(
      <MemoryRouter>
        <SkillsCard {...mockSkill} />
      </MemoryRouter>
    );

    // There shouldn't be any buttons or additional content rendered
    expect(screen.queryByText('Edit')).not.toBeInTheDocument();
    expect(screen.queryByText('Delete')).not.toBeInTheDocument();
  });
});
