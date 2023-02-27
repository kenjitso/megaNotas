import React from "react";
import { Form, FormControlProps } from "react-bootstrap";

interface Props extends FormControlProps {
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    name?: string;
}

const InputEmail = ({ value = undefined, onChange = undefined, name = undefined, ...props }: Props) => {
    const [valid, setValid] = React.useState(true);
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    const onLocalChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        if (!onChange) return;
        const email = ev.target.value;
        if (email.length > 100) return;
        setValid(emailRegex.test(email));
        onChange(ev);
    };

    return (
        <Form.Control
            {...props}
            name={name}
            value={value}
            onChange={onLocalChange}
            placeholder="Enter your email e.g. myemail@email.org"
            isInvalid={!valid}
        />
    );
};

export default InputEmail;
