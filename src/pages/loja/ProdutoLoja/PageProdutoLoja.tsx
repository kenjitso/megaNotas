import React, { useMemo, useState } from "react";
import { Row, Col, Table, Button, FloatingLabel, Form, Dropdown } from "react-bootstrap";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";

import FragmentLoading from "@/components/fragments/FragmentLoading";
import { Icons } from "@/components/icons/icons";
import InputSearchDebounce from "@/components/inputs/InputSearchDebounce";
import { formatCurrency } from "@/features/FormatCurrency";
import { PaginationComponent } from "@/components/pagination/PaginationComponent";
import { IProdutoLoja, ProdutoLojaController } from "@/datatypes/ProdutoLoja";
import { ModalCadastroProdutoLoja } from "./ModalProdutoLoja/ModalCadastroProdutoLoja";
import { ModalSyncVinculos } from "./ModalProdutoLoja/ModalSyncVinculos";
import { ModalAtualizarProdutoLoja } from "./ModalProdutoLoja/ModalAtualizarProdutoLoja";
import { ModalVinculo } from "./ModalProdutoLoja/ModalVinculoCopy";
import { useQuery } from "@tanstack/react-query";
import { compareValues, useSort } from "@/components/utils/FilterArrows";


export function PageProdutoLoja() {
    const [params, setParams] = useSearchParams();
    const { lojaId } = useParams();
    const navigate = useNavigate();
    const [modalVinculoProduto, setVinculoProduto] = useState<IProdutoLoja | undefined>(undefined);
    const [importProdutoLoja, setImportProdutoLoja] = useState<string | undefined>(undefined);
    const [cadastroProdutoLoja, setCadastroProdutoLoja] = useState<string | undefined>(undefined);
    const [modalSyncVinculos, setSyncVinculos] = useState<IProdutoLoja[] | undefined>(undefined);
    const [filtro, setFiltro] = useState("");
    const page = parseInt(params.get("page") ?? "1");
    const limit = parseInt(params.get("limit") ?? "20");
    const { sortOrder, sortBy, handleSort } = useSort<IProdutoLoja>('nome');
    const [isFilteredDesvinculados, setIsFilteredDesvinculados] = useState(false);
    const [isFilteredVinculados, setIsFilteredVinculados] = useState(false);



    const { isFetching, data } = useQuery(["produtosloja", lojaId, filtro], () => {
        const produtoLoja = ProdutoLojaController.search(lojaId ?? "", filtro);
        return produtoLoja;
    });



    const produtosLoja = useMemo(() => {
        let dados = data?.map((produtoLoja: IProdutoLoja) => {

            produtoLoja.nome_original = produtoLoja.nome;

            const ram =
                /16GB RAM/i.test(produtoLoja.nome) ? 16 :
                    /12GB RAM/i.test(produtoLoja.nome) ? 12 :
                        /2GB RAM/i.test(produtoLoja.nome) ? 2 :
                            /3GB RAM/i.test(produtoLoja.nome) ? 3 :
                                /4GB RAM/i.test(produtoLoja.nome) ? 4 :
                                    /6GB RAM/i.test(produtoLoja.nome) ? 6 :
                                        /8GB RAM/i.test(produtoLoja.nome) ? 8 :

                                            null;

            const capacidade =
                /512GB/i.test(produtoLoja.nome) ? 512 :
                    /256GB/i.test(produtoLoja.nome) ? 256 :
                        /128GB/i.test(produtoLoja.nome) ? 128 :
                            /64GB/i.test(produtoLoja.nome) ? 64 :
                                /32GB/i.test(produtoLoja.nome) ? 32 :




                                    null;

            const rede =
                /\b5G\b/i.test(produtoLoja.nome) ? 5 :
                    /\b4G\b/i.test(produtoLoja.nome) ? 4 :
                        null;

            const cor =
                /VERDE/i.test(produtoLoja.nome) ? "VERDE" :
                    /MINT GREEN/i.test(produtoLoja.nome) ? "VERDE" :
                        /LITE GREEN/i.test(produtoLoja.nome) ? "VERDE" :
                            /AZUL/i.test(produtoLoja.nome) ? "AZUL" :
                                /GLACIER BLUE/i.test(produtoLoja.nome) ? "AZUL" :
                                    /ICE BLUE/i.test(produtoLoja.nome) ? "AZUL" :
                                        /TWILIGHT BLUE/i.test(produtoLoja.nome) ? "AZUL" :
                                            /STAR BLUE/i.test(produtoLoja.nome) ? "AZUL" :
                                                /LIGHT BLUE/i.test(produtoLoja.nome) ? "AZUL" :
                                                    /OCEAN BLUE/i.test(produtoLoja.nome) ? "AZUL" :
                                                        /CINZA/i.test(produtoLoja.nome) ? "CINZA" :
                                                            /PRETO/i.test(produtoLoja.nome) ? "PRETO" :
                                                                /BLACK/i.test(produtoLoja.nome) ? "PRETO" :
                                                                    /ONYX GRAY/i.test(produtoLoja.nome) ? "PRETO" :
                                                                        /GRAPHITE GRAY/i.test(produtoLoja.nome) ? "PRETO" :
                                                                            /ONYX BLACK/i.test(produtoLoja.nome) ? "PRETO" :
                                                                                /BRANCO/i.test(produtoLoja.nome) ? "BRANCO" :
                                                                                    /ROXO/i.test(produtoLoja.nome) ? "ROXO" :
                                                                                        /COSMIC PURPLE/i.test(produtoLoja.nome) ? "ROXO" :
                                                                                            /LAVANDER PURPLE/i.test(produtoLoja.nome) ? "ROXO" :
                                                                                                /LAVENDER PURPLE/i.test(produtoLoja.nome) ? "ROXO" :
                                                                                                    /PEPPY PURPLE/i.test(produtoLoja.nome) ? "ROXO" :
                                                                                                        /BRONZE/i.test(produtoLoja.nome) ? "BRONZE" :
                                                                                                            /PRATA/i.test(produtoLoja.nome) ? "PRATA" :
                                                                                                                /AMARELO/i.test(produtoLoja.nome) ? "AMARELO" :
                                                                                                                    /FOREST GREEN/i.test(produtoLoja.nome) ? "VERDE" :
                                                                                                                        /PINK/i.test(produtoLoja.nome) ? "ROSA" :
                                                                                                                            /ROSA/i.test(produtoLoja.nome) ? "ROSA" :

                                                                                                                                null;


            const origem =
                /ÍNDIA/i.test(produtoLoja.nome) ? "INDIA" :
                    /INDIA/i.test(produtoLoja.nome) ? "INDIA" :
                        /GLOBAL/i.test(produtoLoja.nome) ? "GLOBAL" :
                            /INDONESIA/i.test(produtoLoja.nome) ? "INDONESIA" :
                                null;


            const marca = /XIAOMI/i.test(produtoLoja.nome) ? "XIAOMI" : null;



            let posicaoUltimoDS = produtoLoja.nome.indexOf("/");
            let novoNome = posicaoUltimoDS !== -1 ? produtoLoja.nome.substring(0, posicaoUltimoDS) : produtoLoja.nome;


            //  let novoNome = produtoLoja.nome;

            if (origem) novoNome = novoNome.replace(/INDIA|GLOBAL|INDONESIA/gi, '');
            if (cor) novoNome = novoNome.replace(/VERDE|AZUL|CINZA|PRETO|LITE GREEN|BRANCO|ONYX BLACK|BLACK|GLACIER BLUE|MINT GREEN|ICE BLUE|TWILIGHT BLUE|STAR BLUE|COSMIC PURPLE|ONYX GRAY|BRONZE|LIGHT BLUE|LAVANDER PURPLE|GRAPHITE GRAY|OCEAN BLUE|LAVENDER PURPLE|PRATA|PEPPY PURPLE|AMARELO|FOREST GREEN|PINK|ROSA/gi, '');
            if (rede) novoNome = novoNome.replace(/\b4g\b|\b4G\b|\b5g\b|\b5G\b/gi, '');
            if (capacidade) novoNome = novoNome.replace(new RegExp(/\b32GB\b|\b64GB\b|\b128GB\b|\b256GB\b|\b512GB\b/gi, 'i'), '');
            if (ram) novoNome = novoNome.replace(new RegExp(/\b2GB RAM\b|\b3GB RAM\b|\b4GB RAM\b|\b6GB RAM\b|\b8GB RAM\b|\b12GB RAM\b|\b16GB RAM\b/gi, 'i'), '');
            if (marca) novoNome = novoNome.replace(/XIAOMI/gi, '');
            novoNome = novoNome.replace(/CELULAR|DUAL SIM/gi, '').replace(/\s+/g, ' ').trimStart();

            return {
                ...produtoLoja,
                nome: novoNome,
                marca: marca || produtoLoja.marca,
                origem: origem || produtoLoja.origem,
                cor: cor || produtoLoja.cor,
                rede: rede || produtoLoja.rede,
                capacidade: capacidade || produtoLoja.capacidade,
                ram: ram || produtoLoja.ram
            };
        }) ?? []


        if (isFilteredDesvinculados) {
            dados = dados.filter(produto => produto.vinculos === null || produto.vinculos.length === 0);
        }

        if (isFilteredVinculados) {
            dados = dados.filter(produto => produto.vinculos !== null && produto.vinculos.length > 0);
        }

        const sortedData = [...dados].sort(compareValues(sortBy, sortOrder));

        const allItems = sortedData;
        const total = sortedData.length;
        const items = sortedData.slice((page - 1) * limit, limit * page);


        return {
            page, total, limit, items, allItems
        }
    }, [data, page, limit, sortBy, sortOrder, isFilteredDesvinculados, isFilteredVinculados])



    const handlePageChange = (page: number, newLimit?: number) => {
        const limitToUse = newLimit || limit;
        setParams(`?limit=${limitToUse}&page=${page}`);
    };

    const handleFilterDesvinculados = () => {
        setIsFilteredDesvinculados(prevState => !prevState);
        setParams({ page: '1', limit: params.get("limit") || '20' });

    }
    const handleFilterVinculados = () => {
        setIsFilteredVinculados(prevState => !prevState);
        setParams({ page: '1', limit: params.get("limit") || '20' });

    }

    return (
        <React.Fragment>

            <ModalAtualizarProdutoLoja onHide={() => setImportProdutoLoja(undefined)} lojaId={importProdutoLoja} produtoParaguay={produtosLoja.allItems} />
            <ModalCadastroProdutoLoja onHide={() => setCadastroProdutoLoja(undefined)} lojaId={cadastroProdutoLoja} />
            <ModalSyncVinculos onHide={() => setSyncVinculos(undefined)} produtoParaguay={modalSyncVinculos} />
            <ModalVinculo onHide={() => setVinculoProduto(undefined)} produtoParaguay={modalVinculoProduto} />

            <Row className="my-3">
                <Col xs={6} className="d-flex">
                    <Button
                        className="me-3 d-flex align-items-center justify-content-center custom-btn"
                        onClick={() => navigate("/lojas")}
                    >
                        <Icons tipo="voltar" tamanho={22} />   Voltar
                    </Button>

                    <FloatingLabel className="w-100" label="Pesquisar">
                        <InputSearchDebounce
                            controlName="sku"
                            placeholder="pesquisar"
                            onUpdate={setFiltro}
                            pageLink={`?limit=20&page=1`}
                        />
                    </FloatingLabel>

                </Col>
                <Col>
                    <div className="d-flex my-2">
                        <Form.Switch
                            type="checkbox"
                            label="Vinculado"
                            checked={isFilteredVinculados}
                            onChange={() => { }}
                            onMouseDown={e => {
                                e.preventDefault();
                                handleFilterVinculados();
                            }}
                            className="me-3 custom-switch"  // Adicionado a classe custom-switch

                        />

                        <Form.Switch
                            type="checkbox"
                            label="Não Vinculado"
                            checked={isFilteredDesvinculados}
                            onChange={() => { }}
                            onMouseDown={e => {
                                e.preventDefault();
                                handleFilterDesvinculados();
                            }}
                            className="me-3 custom-switch"
                        />
                    </div>
                </Col>


                <Col xs className="d-flex justify-content-end">
                    <Button
                        onClick={() => setSyncVinculos(produtosLoja.items)}
                        className="me-3 custom-btn"
                    >

                        <Icons tipo="update" tamanho={22} />  Sync

                    </Button>
                    <Button
                        onClick={() => setCadastroProdutoLoja(lojaId)}
                        className="me-3 custom-btn"
                    >

                        <Icons tipo="import" tamanho={22} />  Importar

                    </Button>
                    <Button
                        className="custom-btn"
                        onClick={() => setImportProdutoLoja(lojaId)}
                    >
                        <Icons tipo="update" tamanho={22} />  Atualizar
                    </Button>
                </Col>
            </Row>

            <Row className="my-2">
                <Col xs={10}>
                    <Dropdown >Exibir
                        <Dropdown.Toggle id="dropdown-basic" className="no-caret custom-dropdown mx-1 limitPagination">
                            {limit}
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="custom-dropdown-menu">
                            <Dropdown.Item className="custom-dropdown-item" onClick={() => handlePageChange(1, 20)}>20</Dropdown.Item>
                            <Dropdown.Item className="custom-dropdown-item " onClick={() => handlePageChange(1, 50)}>50</Dropdown.Item>
                            <Dropdown.Item className="custom-dropdown-item " onClick={() => handlePageChange(1, 100)}>100</Dropdown.Item>
                            <Dropdown.Item className="custom-dropdown-item " onClick={() => handlePageChange(1, 200)}>200</Dropdown.Item>
                            <Dropdown.Item className="custom-dropdown-item " onClick={() => handlePageChange(1, 400)}>400</Dropdown.Item>
                            <Dropdown.Item className="custom-dropdown-item " onClick={() => handlePageChange(1, 800)}>800</Dropdown.Item>
                        </Dropdown.Menu>
                        resultados por página
                    </Dropdown>
                </Col>
                <Col xs={2} className="justify-content-end text-right">
                    Mostrando de {produtosLoja.items.length} até {limit} de {produtosLoja.total}
                </Col>


            </Row>
            <Table striped bordered hover className="rounded-table">

                <thead>
                    <tr>
                        <th className="th150" onClick={() => handleSort('codigo')} >
                            <div className="thArrow">
                                <span>Codigo</span>
                                <span>
                                    {sortBy === "codigo" ? (sortOrder === "desc" ? "▲" : "▼") : ""}
                                </span>
                            </div>
                        </th>
                        <th className="th250" onClick={() => handleSort('marca')} >
                            <div className="thArrow">
                                <span>Marca</span>
                                <span>
                                    {sortBy === "marca" ? (sortOrder === "desc" ? "▲" : "▼") : ""}
                                </span>
                            </div>
                        </th>
                        <th className="th250" onClick={() => handleSort('nome')} >
                            <div className="thArrow">
                                <span>Modelo</span>
                                <span>
                                    {sortBy === "nome" ? (sortOrder === "desc" ? "▲" : "▼") : ""}
                                </span>
                            </div>
                        </th>
                        <th className="th250" onClick={() => handleSort('origem')} >
                            <div className="thArrow">
                                <span>Origem</span>
                                <span>
                                    {sortBy === "origem" ? (sortOrder === "desc" ? "▲" : "▼") : ""}
                                </span>
                            </div>
                        </th>
                        <th className="th250" onClick={() => handleSort('cor')} >
                            <div className="thArrow">
                                <span>Cor</span>
                                <span>
                                    {sortBy === "cor" ? (sortOrder === "desc" ? "▲" : "▼") : ""}
                                </span>
                            </div>
                        </th>
                        <th className="th150" onClick={() => handleSort('rede')}>
                            <div className="thArrow">
                                <span>Rede</span>
                                <span>
                                    {sortBy === "rede" ? (sortOrder === "desc" ? "▲" : "▼") : ""}
                                </span>
                            </div>
                        </th>
                        <th className="th150" onClick={() => handleSort('ram')}>
                            <div className="thArrow">
                                <span>Ram</span>
                                <span>
                                    {sortBy === "ram" ? (sortOrder === "desc" ? "▲" : "▼") : ""}
                                </span>
                            </div>
                        </th>
                        <th className="th150" onClick={() => handleSort('capacidade')}>
                            <div className="thArrow">
                                <span>Capacidade</span>
                                <span>
                                    {sortBy === "capacidade" ? (sortOrder === "desc" ? "▲" : "▼") : ""}
                                </span>
                            </div>
                        </th>
                        <th className="th130" onClick={() => handleSort('preco')}>
                            <div className="thArrow">
                                <span>Preço U$</span>
                                <span>
                                    {sortBy === "preco" ? (sortOrder === "desc" ? "▲" : "▼") : ""}
                                </span>
                            </div>
                        </th>
                        <th className="th70" onClick={() => handleSort('vinculos')}>
                            <div className="thArrow">
                                <span>Vinc.</span>
                                <span>
                                    {sortBy === "vinculos" ? (sortOrder === "desc" ? "▲" : "▼") : ""}
                                </span>
                            </div>
                        </th>
                        <th className="th70">
                            <span>Est.</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        !isFetching && produtosLoja?.items?.map((produtoLoja, index) => <ItemTable key={index} produtoLoja={produtoLoja} onVinculo={setVinculoProduto} />)
                    }
                </tbody>
            </Table>
            {isFetching && <FragmentLoading />}
            <Row className="my-3">
                <Col xs className="d-flex">
                    <PaginationComponent<IProdutoLoja>
                        items={produtosLoja?.total}
                        pageSize={produtosLoja.limit}
                        onPageChange={handlePageChange}
                        currentPage={produtosLoja.page ?? 1}
                    />

                    <Col className="ml-auto mx-3">
                        <Dropdown > Exibir
                            <Dropdown.Toggle id="dropdown-basic" className="no-caret custom-dropdown mx-1 limitPagination">
                                {limit}
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="custom-dropdown-menu">
                                <Dropdown.Item className="custom-dropdown-item" onClick={() => handlePageChange(1, 20)}>20</Dropdown.Item>
                                <Dropdown.Item className="custom-dropdown-item" onClick={() => handlePageChange(1, 50)}>50</Dropdown.Item>
                                <Dropdown.Item className="custom-dropdown-item" onClick={() => handlePageChange(1, 100)}>100</Dropdown.Item>
                                <Dropdown.Item className="custom-dropdown-item" onClick={() => handlePageChange(1, 200)}>200</Dropdown.Item>
                                <Dropdown.Item className="custom-dropdown-item" onClick={() => handlePageChange(1, 400)}>400</Dropdown.Item>
                                <Dropdown.Item className="custom-dropdown-item" onClick={() => handlePageChange(1, 800)}>800</Dropdown.Item>
                            </Dropdown.Menu>
                            resultados por página
                        </Dropdown>
                    </Col>

                    <span className="ml-2">Mostrando de {produtosLoja.items.length} até {limit} de {produtosLoja.total}</span>
                </Col>
            </Row>
        </React.Fragment>
    );
}

interface IPropsItensTable {
    produtoLoja: IProdutoLoja,
    onVinculo: (idProdutoParaguay: IProdutoLoja) => void,
}

function ItemTable({ produtoLoja, onVinculo }: IPropsItensTable) {
    return (

        <React.Fragment>
            <tr>
                <td>
                    {produtoLoja.codigo}
                </td>
                <td>

                    <a
                        style={{ color: "blue" }}
                        href={`https://atacadogames.com/lista-produtos/marca/xiaomi/302`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={produtoLoja.codigo}
                    >
                        {produtoLoja.marca}
                    </a>
                </td>
                <td>

                    <a
                        style={{ color: "blue" }}
                        href={`https://atacadogames.com/lista-produtos/termo/${produtoLoja.codigo}/1`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={produtoLoja.codigo}
                    >
                        {produtoLoja.nome}
                    </a>
                </td>
                <td>
                    {produtoLoja.origem}
                </td>
                <td>
                    {produtoLoja.cor}
                </td>
                <td>
                    {produtoLoja.rede}G
                </td>
                <td>
                    {produtoLoja.ram}
                </td>
                <td>
                    {produtoLoja.capacidade}
                </td>
                <td>
                    U$: {formatCurrency(produtoLoja.preco)}
                </td>
                <td
                    className="centralize-icon"
                    style={{
                        backgroundColor: produtoLoja.vinculos && produtoLoja.vinculos.length > 0 ? "green" : "red"
                    }}
                    onClick={() => { onVinculo(produtoLoja); }}
                    role="button"
                    aria-label="Vincular Produto"
                >
                    <Icons tipo="link" />
                </td>
                <td className="centralize-icon">
                    <Form.Check
                        checked={produtoLoja.estoque}
                        readOnly
                    />
                </td>
            </tr>
        </React.Fragment >
    );
}
