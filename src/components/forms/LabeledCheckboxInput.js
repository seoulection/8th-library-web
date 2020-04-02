import React from 'react';

function LabeledCheckboxInput(props) {
  const handleOnChange = event => {
    props.onChange(event.target.checked);
  };

  return (
    <div data-testid="LabeledCheckboxInput" className="form-group form-check">
      <input
        id="checkbox-input"
        data-testid="CheckboxInput"
        className="form-check-input"
        type="checkbox"
        onChange={handleOnChange}
        checked={props.checked}
      />
      <label
        htmlFor="checkbox-input"
        className="form-check-label text-light"
      >
        {props.label}
      </label>
    </div>
  );
}

export default LabeledCheckboxInput;
