

import { Table } from "react-bootstrap";
import "@/assets/style.css"
import { IProdutoLoja } from "@/datatypes/ProdutoLoja";
import React from "react";

interface IProps {
    listProdutoLoja?: IProdutoLoja[] | null;
}

export function ModalTableAtualizarProdutoLoja({ listProdutoLoja }: IProps) {


    return (
        <React.Fragment>
            <Table bordered hover>
                <thead>
                    <tr>
                        <th>Arquivo carregado com sucesso</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <strong>Total de itens a serem atualizados:</strong>{" "}
                            {listProdutoLoja?.length || 0}
                        </td>
                    </tr>
                </tbody>
            </Table>
        </React.Fragment>
    );
}