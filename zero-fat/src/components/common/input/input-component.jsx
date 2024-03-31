import React from "react";
import "./input.css";

const Input = (props) => {
  const { label, ...inputProps } = props;

  return (
    <div className="input-group">
      {label ? (
        <label>
          <span>{label}</span>
          &nbsp;
          {inputProps.required && <span>*</span>}
        </label>
      ) : null}
      <input {...inputProps} autoComplete="off" />
    </div>
  );
};

export default Input;
