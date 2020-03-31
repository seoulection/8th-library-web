import React from 'react';

function LabeledCheckboxInput(props) {
  const handleOnChange = event => {
    props.onChange(event.target.checked);
  };

  return (
    <div data-testid="LabeledCheckboxInput">
      <label htmlFor="checkbox-input">{props.label}</label>
      <input
        id="checkbox-input"
        data-testid="CheckboxInput"
        type="checkbox"
        onChange={handleOnChange}
        checked={props.checked}
      />
    </div>
  );
}

export default LabeledCheckboxInput;
