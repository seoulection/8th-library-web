import React from 'react';
import Resizer from 'react-image-file-resizer';

function LabeledImageInput(props) {
  const handleOnChange = event => {
    var fileInput = false;
    if (event.target.files[0]) {
      fileInput = true;
    }
    if (fileInput) {
      Resizer.imageFileResizer(
        event.target.files[0],
        400,
        400,
        'JPEG',
        100,
        0,
        uri => {
          props.onChange(uri);
        },
        'base64'
      );
    }
  }

  return (
    <>
      <label>{props.label}</label>
      <input
        className="form-control"
        type="file"
        accept=".jpg,.jpeg,.png"
        onChange={handleOnChange}
        required
      />
    </>
  );
}

export default LabeledImageInput;
