import React, { CSSProperties } from "react";

interface Props {
  autoFocus?: boolean;
  className?: string;
  style?: CSSProperties;
  value: string;
  onValueChange: (value: string) => void;
  maxLength?: number;
  minLength?: number;
  placeholder?: string;
}

const InputTextoEsp: React.ForwardRefRenderFunction<HTMLInputElement, Props> = ({
  autoFocus = false,
  className = "",
  style = {},
  value,
  onValueChange,
  maxLength = 1000, // valor padrão de 60 caracteres
  minLength = 0, // valor padrao de 5 caracteres
  placeholder = "Insira o texto aqui", // valor padrao
},
  ref
) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value.replace(/[^a-zA-Z0-9\-_.\/<>,'"=&?: ]/g, "");
    onValueChange(newValue);
  };

  return (
    <input
      type="text"
      autoFocus={autoFocus}
      ref={ref}
      className={className}
      style={style}
      value={value}
      maxLength={maxLength}
      minLength={minLength}
      onChange={handleChange}
      placeholder={placeholder}
    />
  );
};

export default React.forwardRef(InputTextoEsp);
