import { useDebounce } from "@/hooks/useDebounce";
import React from "react";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";


interface Props {
    initial?: string;
    delay?: number,
    controlName?: string,
    placeholder?: string,
    onUpdate: (search: string) => void,

}


export default function InputSearchDebounce({
    initial = "",
    delay = 1000,
    controlName,
    placeholder,
    onUpdate,

}: Props) {
    const [search, setSearch] = React.useState(initial);
    const debounce = useDebounce(search, delay);


    React.useEffect(() => {
        setSearch(initial);
    }, [initial]);
    

    React.useEffect(() => {
        onUpdate(debounce);

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

