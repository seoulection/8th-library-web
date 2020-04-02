import React from 'react';
import { useLocation } from 'react-router-dom';
import LabeledCheckboxInput from './LabeledCheckboxInput';

function NavbarFilterForm(props) {
  const location = useLocation();

  const handleCheckboxChange = checked => {
    props.onCheckboxChange(checked);
  };

  const handleFilterChange = event => {
    props.onFilterChange(event.target.value);
  };

  if (location.pathname === '/') {
    return (
      <form data-testid="NavbarFilterForm" className="form-inline">
        <input
          className="form-control mr-sm-2"
          type="text"
          value={props.filterQuery}
          onChange={handleFilterChange}
          placeholder="Filter books by title"
        />
        <LabeledCheckboxInput
          label="Show only available"
          onChange={handleCheckboxChange}
          checked={props.checked}
        />
      </form>
    );
  }
  return null;
}

export default NavbarFilterForm;
