import React from 'react';

function Button(props) {
  return <button className="btn btn-primary" onClick={props.onButtonClick}>{props.buttonText}</button>;
}

export default Button;
