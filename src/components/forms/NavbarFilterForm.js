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
      <form data-testid="NavbarFilterForm" className="navbar-form navbar-left">
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            value={props.filterQuery}
            onChange={handleFilterChange}
            placeholder="Filter books by title"
          />
        </div>
        <div className="form-group">
          <LabeledCheckboxInput
            label="Show only available"
            onChange={handleCheckboxChange}
            checked={props.checked}
          />
        </div>
      </form>
    );
  }
  return null;
}

export default NavbarFilterForm;
