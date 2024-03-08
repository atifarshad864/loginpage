import React from "react";

export const AdressField = ({
  label,
  spanStyles,
  inputStyles,
  icon,
  isRequired,
  value,
  onChange,
  id,
  placeholder,
  rows,
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={id}
          className={"text-gray-700 flex items-center" + spanStyles}
        >
          {icon}
          {label} {isRequired && <span className="text-red-500">*</span>}
        </label>
      )}
      <textarea
        className={
          "form-textarea mt-1 w-full bg-gray-100 hover:bg-blue-100 focus:bg-white px-4 py-2 rounded" +
          +inputStyles
        }
        value={value}
        onChange={onChange}
        id={id}
        placeholder={placeholder}
        rows={rows}
      ></textarea>
    </div>
  );
};
