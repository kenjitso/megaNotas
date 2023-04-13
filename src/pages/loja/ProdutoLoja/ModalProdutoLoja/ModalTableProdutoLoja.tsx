import { Table } from "react-bootstrap";
import "@/assets/style.css"
import { IProdutoLoja } from "@/datatypes/ProdutoLoja";
import React from "react";

interface IProps {
    listProdutoLoja?: IProdutoLoja[] | null;
}

export function ModalTableProdutoLoja({ listProdutoLoja }: IProps) {

    return (
        <React.Fragment>
            <Table bordered hover >
                <thead>
                    <tr>
                        <th className="th40">
                            <div className="thArrow">
                                <span>Codigo</span>
                            </div>
                        </th>
                        <th className="th250" >
                            <div className="thArrow">
                                <span>Nome</span>
                            </div>
                        </th>
                        <th className="th110" >
                            <div className="thArrow">
                                <span>Preço</span>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {listProdutoLoja?.slice(0,10).map((produtoLoja, index) => (
                        <tr key={index} >
                            <td>
                                {produtoLoja.codigo}
                            </td>
                            <td>
                                {produtoLoja.nome}
                            </td>
                            <td >
                                U$: {(produtoLoja.preco).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </td>
                        </tr>
                    ))
                    }
                </tbody>
            </Table>
        </React.Fragment>
    );
}