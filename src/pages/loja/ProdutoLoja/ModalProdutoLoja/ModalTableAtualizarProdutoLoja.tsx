

import { Table } from "react-bootstrap";
import "@/assets/style.css"
import { IProdutoLoja } from "@/datatypes/ProdutoLoja";
import React from "react";

interface IProps {
    listProdutoLoja?: {
        cadastrados: IProdutoLoja[];
        naoCadastrados: IProdutoLoja[];
    } | null;
}


export function ModalTableAtualizarProdutoLoja({ listProdutoLoja }: IProps) {


    return (
        <React.Fragment>
            <Table bordered hover>
                <thead>
                    <tr>
                        <th>Valores atualizado com sucesso!</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <strong>Total de itens atualizados com sucesso:</strong>{" "}
                            {listProdutoLoja?.cadastrados.length || 0}
                            <br />
                            <strong>Total de itens a serem cadastrados:</strong>{" "}
                            {listProdutoLoja?.naoCadastrados.length || 0}
                            <br />
                        </td>
                    </tr>
                </tbody>
            </Table>
        </React.Fragment>
    );
}