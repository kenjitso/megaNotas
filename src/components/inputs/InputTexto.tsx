import React, { CSSProperties } from "react";

interface Props {
    autoFocus?: boolean;
    className?: string;
    style?: CSSProperties;
    value: string;
    onValueChange: (value: string) => void;
}

const InputTexto: React.ForwardRefRenderFunction<HTMLInputElement, Props> = (
    { autoFocus = false, className = "", style = {}, value, onValueChange },
    ref
) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
       
            onValueChange(newValue);
       
    };

    return (
        <input
            autoFocus={autoFocus}
            ref={ref}
            className={className}
            style={style}
            value={value}
            onChange={handleChange}
        />
    );
};

export default React.forwardRef(InputTexto);
