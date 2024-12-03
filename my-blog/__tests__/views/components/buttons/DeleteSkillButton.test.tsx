import { fireEvent, render, screen } from '@testing-library/react';
import { none, some } from 'fp-ts/Option';
import DeleteSkillButton from '../../../../src/views/components/buttons/DeleteSkillButton';


describe('DeleteSkillButton Component', () => {

  const mockHandleDelete = jest.fn().mockResolvedValue(undefined);

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the delete button', () => {
    render(
      <DeleteSkillButton
        handleDelete={mockHandleDelete}
        loading={none}
        errorMessage={none}
        deleteResponseBody={none}
      />
    );

    const deleteButton = screen.getByRole('button', { name: /delete this skill/i });
    expect(deleteButton).toBeInTheDocument();
    expect(deleteButton).not.toBeDisabled();
  });

  test('disables the delete button when loading is true', () => {
    render(
      <DeleteSkillButton
        handleDelete={mockHandleDelete}
        loading={some(true)}
        errorMessage={none}
        deleteResponseBody={none}
      />
    );

    const deleteButton = screen.getByRole('button', { name: /delete this skill/i });
    expect(deleteButton).toBeDisabled();
  });

  test('shows error message when errorMessage is provided', () => {
    const errorMessage = 'An error occurred';
    render(
      <DeleteSkillButton
        handleDelete={mockHandleDelete}
        loading={none}
        errorMessage={some(errorMessage)}
        deleteResponseBody={none}
      />
    );

    const errorText = screen.getByText(errorMessage);
    expect(errorText).toBeInTheDocument();
    expect(errorText).toHaveClass('text-red-500');
  });

  test('displays the delete response body when deleteResponseBody is provided', () => {
    const deleteResponseBody = { message: 'Skill deleted successfully' };
    render(
      <DeleteSkillButton
        handleDelete={mockHandleDelete}
        loading={none}
        errorMessage={none}
        deleteResponseBody={some(deleteResponseBody)}
      />
    );

    const responseBody = screen.getByText('Skill deleted successfully');
    expect(responseBody).toBeInTheDocument();
  });

  test('calls handleDelete when form is submitted', () => {

    render(
      <DeleteSkillButton
        handleDelete={mockHandleDelete}
        loading={none}
        errorMessage={none}
        deleteResponseBody={none}
      />
    );

    const form = screen.getByRole('button', { name: /delete this skill/i }).closest('form');
    fireEvent.submit(form!);

    expect(mockHandleDelete).toHaveBeenCalled();
  });

  test('does not show delete response body when none is provided', () => {
    render(
      <DeleteSkillButton
        handleDelete={mockHandleDelete}
        loading={none}
        errorMessage={none}
        deleteResponseBody={none}
      />
    );

    const responseBody = screen.queryByText(/skill deleted successfully/i);
    expect(responseBody).not.toBeInTheDocument();
  });

});
