import React from 'react';

function LabeledTextInput(props) {
  const handleOnChange = event => {
    props.onChange(event.target.value);
  }

  return (
    <>
      <label>{props.label}</label>
      <input
        className="form-control"
        type="text"
        value={props.value}
        onChange={handleOnChange}
        required
      />
    </>
  );
}

export default LabeledTextInput;
