/*import {Table } from "react-bootstrap";
import "@/assets/style.css"
import { IProdutoLoja } from "@/datatypes/ProdutoLoja";
import React, { useEffect, useState } from "react";
import { formatCurrency } from "@/components/utils/FormatCurrency";

interface IProps {
    listProdutoLoja?: IProdutoLoja[] | null;
}

export function ModalTableImportProdutoLoja({ listProdutoLoja }: IProps) {


    return (
        <React.Fragment>
            <Table bordered hover >
                <thead>
                    <tr>
                        <th className="th110">
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
                    {listProdutoLoja?.slice(0, 10).map((produtoLoja, index) => (
                        <tr key={index} >
                            <td style={{ textAlign: 'left' }}>
                                {produtoLoja.codigo}
                            </td>
                            <td>
                                {produtoLoja.nome}
                            </td>
                            <td >
                                U$: {formatCurrency(produtoLoja.preco)}
                            </td>
                        </tr>
                    ))
                    }
                </tbody>
            </Table>
        </React.Fragment>
    );
}
*/


import { Table } from "react-bootstrap";
import "@/assets/style.css"
import { IProdutoLoja } from "@/datatypes/ProdutoLoja";
import React, { useEffect, useState } from "react";
import { formatCurrency } from "@/features/FormatCurrency";

interface IProps {
    listProdutoLoja?: IProdutoLoja[] | null;
}

export function ModalTableImportProdutoLoja({ listProdutoLoja }: IProps) {


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