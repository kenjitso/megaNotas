import React from "react";
import Spinner from "react-bootstrap/Spinner";

/**
 * Componente com um spinner para facilmente integrar animação de loading em outro componente
 * Use Case: Buscando dados usando useQuery/fetch, enquanto faz o download o componente exibe esse fragmento.
 */
export default function FragmentLoading() {
    return (
        <React.Fragment>
            <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                <Spinner animation="grow" role="status" />
            </div>
        </React.Fragment>
    );
}