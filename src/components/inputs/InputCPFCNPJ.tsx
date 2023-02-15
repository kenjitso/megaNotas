import React from "react";

const TYPES = {
    CPF: "999.999.999-99",
    CNPJ: "99.999.999/9999-99"
};

const MAX_LENGTH = clear(TYPES.CNPJ).length;

interface Props {
    value?: string,
    onChange?: (event: React.ChangeEvent) => void,
    name?: string
}

/**
 * Componente do tipo input com formatação de CPF/CNPJ
 */
export default function InputCPFCNPJ({
    value = undefined,
    onChange = undefined,
    name = undefined,
    ...props
}: Props) {
    let current = clear(value);

    if (current) current = applyMask(current, TYPES[getMask(current)]);

    function onLocalChange(ev: React.ChangeEvent<HTMLInputElement>) {
        if (!onChange) return;
        let value = clear(ev.target.value);
        const mask = getMask(value);
        const nextLength = value.length;
        if (nextLength > MAX_LENGTH) return;
        value = applyMask(value, TYPES[mask]);
        ev.target.value = value;
        onChange(ev);
    }

    return (
        <input {...props} name={name} value={current} onChange={onLocalChange} inputMode="numeric" />
    );
}

function getMask(value: string) {
    return value.length > 11 ? "CNPJ" : "CPF";
}

function applyMask(value: string, mask: string) {
    let result = "";
    let inc = 0;
    Array.from(value).forEach((letter, index) => {
        while (!mask[index + inc].match(/[0-9]/)) {
            result += mask[index + inc];
            inc++;
        }
        result += letter;
    });
    return result;
}

function clear(value?: string) {
    return value?.replace(/[^0-9]/g, "") ?? "";
}