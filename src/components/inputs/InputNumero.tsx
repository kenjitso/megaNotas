import React, { CSSProperties } from "react";

interface Props {
    autoFocus?: boolean;
    className?: string;
    decimals?: number;
    max?: number;
    negative?: boolean
    onValueChange: (value: number) => void;
    style?: CSSProperties;
    readOnly: boolean;
    value: number;
}

/**
 * Componente do tipo input que gerencia formatação númerica
 * Use Cases: Dinheiro (2 casas decimais), Peso (3 casas decimais)
 */
const InputNumero = React.forwardRef<HTMLInputElement, Props>(({
    autoFocus = false,
    className = "",
    decimals = 2,
    max = Number.MAX_SAFE_INTEGER,
    onValueChange,
    style = {},
    readOnly= false,
    value,
    negative
}, ref) => {

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        const unformatted = newValue.replace(/[^0-9]/g, "");
        const isNegative = (newValue.match(/-/g) || []).length === 1;
        let nextValue = parseInt(unformatted, 10);
        if (isNaN(nextValue)) {
            nextValue = 0;
        }
        if (isNegative && negative) {
            nextValue *= -1;
        }
        nextValue = nextValue / Math.pow(10, decimals);
        if (nextValue > max) {
            nextValue = parseInt(max.toString(), 10);
        }
        if (!Number.isFinite(nextValue) || Number.isNaN(nextValue)) {
            nextValue = 0;
        }
        onValueChange(nextValue);
    };

    const valueDisplay = value.toLocaleString("pt-BR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

    return (
        <input
            autoFocus={autoFocus}
            ref={ref}
            className={className}
            inputMode="numeric"
            onChange={onChange}
            style={style}
            value={valueDisplay}
            readOnly={readOnly}
        />
    );
});

InputNumero.displayName = "InputNumero";

export default InputNumero;