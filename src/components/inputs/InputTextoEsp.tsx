import React, { CSSProperties } from "react";

interface Props {
  autoFocus?: boolean;
  className?: string;
  style?: CSSProperties;
  value: string;
  onValueChange: (value: string) => void;
  maxLength?: number;
}

const InputTextoEsp: React.ForwardRefRenderFunction<HTMLInputElement, Props> = ({ 
    autoFocus = false, 
    className = "", 
    style = {}, 
    value, 
    onValueChange,
    maxLength = 60, // valor padrão de 12 caracteres
},
  ref
) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value.replace(/[^a-zA-Z\-_.\/<>,'" ]/g, "");
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
      onChange={handleChange}
    />
  );
};

export default React.forwardRef(InputTextoEsp);
