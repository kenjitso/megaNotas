import React, { CSSProperties } from "react";

interface Props {
  autoFocus?: boolean;
  className?: string;
  style?: CSSProperties;
  value: string;
  onValueChange: (value: string) => void;
}

const InputTexto: React.ForwardRefRenderFunction<HTMLInputElement, Props> = ({ 
    autoFocus = false, 
    className = "", 
    style = {}, 
    value, 
    onValueChange 
},
  ref
) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value.replace(/[^a-zA-ZáéíóúàèìòùâêîôûÁÉÍÓÚÃÕãõ ]/g, ""); // remove caracteres não alfabéticos
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
      onChange={handleChange}
      pattern="[a-zA-Z]*" // permite apenas letras
    />
  );
};

export default React.forwardRef(InputTexto);
