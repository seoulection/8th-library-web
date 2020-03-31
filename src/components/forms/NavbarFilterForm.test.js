import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import NavbarFilterForm from './NavbarFilterForm';
import renderWithRouter from '../../setupTests';

afterEach(cleanup);

describe('NavbarFilter', () => {
  const setup = () => {
    const utils = renderWithRouter(
      <NavbarFilterForm />,
      { route: '/' }
    );

    return { ...utils };
  };

  test('it renders the NavbarFilter when the route is /', () => {
    const { getByTestId } = setup();
    const navbarFilter = getByTestId('NavbarFilterForm');

    expect(navbarFilter).toBeInTheDocument();
  });

  test('it does not render the NavbarFilter when the route is not /', () => {
    const { queryByTestId } = renderWithRouter(
      <NavbarFilterForm />,
      { route: '/some-random-route' }
    );
    const navbarFilter = queryByTestId('NavbarFilterForm');

    expect(navbarFilter).not.toBeInTheDocument();
  });

  test('renders an filter text input', () => {
    const { getByRole } = setup();
    const filterInput = getByRole('textbox');

    expect(filterInput).toBeInTheDocument();
  });

  test('renders a checkbox to toggle book availability', () => {
    const { getByRole } = setup();
    const checkbox = getByRole('checkbox');

    expect(checkbox).toBeInTheDocument();
  });

  test('calls the mock onChange function on filter input change', () => {
    const mockOnChange = jest.fn();
    const { getByRole } = renderWithRouter(
      <NavbarFilterForm onFilterChange={mockOnChange} />,
      { route: '/' }
    );
    const filterInput = getByRole('textbox');
    fireEvent.change(filterInput, { target: { value: 'Hello' } });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  test('calls the mock onChange function on checkbox change', () => {
    const mockOnChange = jest.fn();
    const { getByRole } = renderWithRouter(
      <NavbarFilterForm onCheckboxChange={mockOnChange} />,
      { route: '/' }
    );
    const checkbox = getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });
});
