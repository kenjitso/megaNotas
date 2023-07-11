import { useDebounce } from "@/hooks/useDebounce";
import React from "react";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";


interface Props {
    initial?: string;
    delay?: number,
    controlName?: string,
    placeholder?: string,
    onUpdate: (search: string) => void,
    pageLink?: string;
    externalValue?: string; // Adicione esta nova prop
}

export default function InputSearchDebounce({
    initial = "",
    delay = 1000,
    controlName,
    placeholder,
    onUpdate,
    pageLink,
    externalValue, // Adicione esta nova prop
}: Props) {

    const [search, setSearch] = React.useState(initial);
    const debounce = useDebounce(search, delay);
    const navigate = useNavigate();
    const [initialUpdate, setInitialUpdate] = React.useState(true);

    // Adicione este novo useEffect
    React.useEffect(() => {
        if (externalValue !== undefined) {
            setSearch(externalValue);
        }
    }, [externalValue]);

    React.useEffect(() => {
        if (!initialUpdate) {
            onUpdate(debounce);
            navigate(pageLink || "");
        }
        setInitialUpdate(false);
    }, [debounce]);

    return (
        <React.Fragment>
            <Form.Control
                placeholder={placeholder}
                name={controlName}
                value={search}
                onChange={(event) => setSearch(event.target.value)}
            />
            {search !== debounce && <div className="position-absolute top-50 end-0 translate-middle-y me-2"><Spinner animation="border" /></div>}
        </React.Fragment>
    );
}
