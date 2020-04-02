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
    <div data-testid="LabeledImageInput" className="form-group">
      <label htmlFor="image-input">{props.label}</label>
      <input
        id="image-input"
        data-testid="ImageInput"
        className="form-control"
        type="file"
        accept=".jpg,.jpeg,.png"
        onChange={handleOnChange}
        required
      />
    </div>
  );
}

export default LabeledImageInput;
