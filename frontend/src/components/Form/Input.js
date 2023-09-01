const fixedInputClass =
  "rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm";
const Input = ({
    handleChange,
    value,
    labelText,
    labelFor,
    id,
    name,
    type,
    isRequired = false,
    placeholder,
    accept,
    customClass
  }) => {
    if (type === "file") {
      return (
        <div className="my-5">
          <label htmlFor={labelFor} className="sr-only">
            {labelText}
          </label>
          <div className="flex items-center">
            <input
              onChange={handleChange}
              id={id}
              name={name}
              type={type}
              required={isRequired}
              className="hidden"
              accept={accept}
            />
            <label
              htmlFor={id}
              className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md cursor-pointer ${customClass}`}
            >
              Select Profile Picture
            </label>
            {value && (
              <span className="ml-2 text-gray-600"> {value.name} </span>
            )}
          </div>
        </div>
      );
    }
  
    return (
      <div className="my-5">
        <label htmlFor={labelFor} className="sr-only">
          {labelText}
        </label>
        <input
          onChange={handleChange}
          value={value}
          id={id}
          name={name}
          type={type}
          required={isRequired}
          className={fixedInputClass + customClass}
          placeholder={placeholder}
        />
      </div>
    );
  };
  
  export default Input;