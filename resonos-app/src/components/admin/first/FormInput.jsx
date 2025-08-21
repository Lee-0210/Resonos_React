import React from 'react';

const FormInput = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  required = false,
  className = 'form-control',
  containerClassName = 'col-md-6 text-start width-100',
  ...rest
}) => {
return (
  <>
    <label className="form-label d-flex" htmlFor={name}>
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      className={`form-control ${className || ''}`}
      value={value}
      onChange={onChange}
      required={required}
      {...rest}
    />
      </>
);

};

export default FormInput;
