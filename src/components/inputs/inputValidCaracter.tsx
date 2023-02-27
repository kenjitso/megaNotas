import React from "react";
import { Form } from "react-bootstrap";

const MAX_LENGTH = 50;

interface Props {
    value?: string,
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
    name?: string,
    placeholder?: string,
    required: boolean;
}

export default function InputValidCharacter({
    name = "",
    onChange = () => { },
    value = "",
    placeholder = "",
    required=true,
    ...props
}: Props) {
    const current = value.replace(/[^a-zA-Z\s]+/g, "");
    function onLocalChange(ev: React.ChangeEvent<HTMLInputElement>) {
        let value = ev.target.value.replace(/[^a-zA-Z\s]+/g, "");
        if (value.length > MAX_LENGTH) {
            value = value.slice(0, MAX_LENGTH);
        }
        ev.target.value = value;
        onChange(ev);
    }
    return (
        <Form.Control
            {...props}
            name={name}
            onChange={onLocalChange}
            value={current}
            inputMode="text"
            placeholder={placeholder}
required

        />
    );
}