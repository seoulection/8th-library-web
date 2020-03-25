import React from 'react';

function LabeledTextInput(props) {
  const handleOnChange = event => {
    props.onChange(event.target.value);
  }

  return (
    <div data-testid="LabeledTextInput">
      <label htmlFor="input">{props.label}</label>
      <input
        id="input"
        data-testid="TextInput"
        className="form-control"
        type="text"
        value={props.value}
        onChange={handleOnChange}
        required
      />
    </div>
  );
}

export default LabeledTextInput;
