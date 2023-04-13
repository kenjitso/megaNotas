import React, { CSSProperties, useState } from "react";

interface Props {
  autoFocus?: boolean;
  className?: string;
  style?: CSSProperties;
  value: string;
  maxLength?: number;
  onValueChange: (value: string) => void;
  readOnly: boolean;
  required?: boolean;
}

const InputTexto: React.ForwardRefRenderFunction<HTMLInputElement, Props> = ({
  autoFocus = false,
  className = "",
  style = {},
  value = "",
  maxLength = 1000,
  onValueChange,
  readOnly = false,
  required = false,
},
  ref
) => {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    onValueChange(newValue);
  };

  return (
    <input
      type="text"
      autoFocus={autoFocus}
      ref={ref}
      className={className}
      style={style}
      value={inputValue}
      onChange={handleChange}
      pattern="[a-zA-Z]*" // permite apenas letras
      readOnly={readOnly}
      maxLength={maxLength}
      required={required}
    />
  );
};

export default React.forwardRef(InputTexto);
