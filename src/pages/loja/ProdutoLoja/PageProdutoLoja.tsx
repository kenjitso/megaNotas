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
                /2RAM/i.test(produtoLoja.nome) ? 2 :
                    /3RAM/i.test(produtoLoja.nome) ? 3 :
                        /4RAM/i.test(produtoLoja.nome) ? 4 :
                            /6RAM/i.test(produtoLoja.nome) ? 6 :
                                /8RAM/i.test(produtoLoja.nome) ? 8 :
                                    /12RAM/i.test(produtoLoja.nome) ? 12 :
                                        /16RAM/i.test(produtoLoja.nome) ? 16 :
                                            null;

            const capacidade =
                /32GB/i.test(produtoLoja.nome) ? 32 :
                    /64GB/i.test(produtoLoja.nome) ? 64 :
                        /128GB/i.test(produtoLoja.nome) ? 128 :
                            /256GB/i.test(produtoLoja.nome) ? 256 :
                                /512GB/i.test(produtoLoja.nome) ? 512 :
                                    null;

            const rede =
                /\b5g\b/i.test(produtoLoja.nome) ? 5 :
                    /\b4g\b/i.test(produtoLoja.nome) ? 4 :
                        null;

            const cor =
                /BLACK/i.test(produtoLoja.nome) ? "BLACK" :
                    /BLAC/i.test(produtoLoja.nome) ? "BLACK" :
                        /MINT GREEN/i.test(produtoLoja.nome) ? "GREEN" :
                            /MINT GREE/i.test(produtoLoja.nome) ? "GREEN" :
                                /MINT REE/i.test(produtoLoja.nome) ? "GREEN" :
                                    /PEPPY PURPLE/i.test(produtoLoja.nome) ? "PURPLE" :
                                        /PURPLE/i.test(produtoLoja.nome) ? "PURPLE" :
                                            /BLUE/i.test(produtoLoja.nome) ? "BLUE" :
                                                /LITE PINK/i.test(produtoLoja.nome) ? "PINK" :
                                                    /PEBBLE WHITE/i.test(produtoLoja.nome) ? "WHITE" :
                                                        /GLACIE/i.test(produtoLoja.nome) ? "WHITE" :
                                                            /WHITE/i.test(produtoLoja.nome) ? "WHITE" :
                                                                /AURORA GREEN/i.test(produtoLoja.nome) ? "GREEN" :
                                                                    /AURORA/i.test(produtoLoja.nome) ? "GREEN" :
                                                                        /CORAL GREEN/i.test(produtoLoja.nome) ? "GREEN" :
                                                                            /CORAL/i.test(produtoLoja.nome) ? "CORAL" :
                                                                                /GREEN/i.test(produtoLoja.nome) ? "GREEN" :
                                                                                    /GREE/i.test(produtoLoja.nome) ? "GREEN" :
                                                                                        /GRAY/i.test(produtoLoja.nome) ? "GRAY" :
                                                                                            /GREY/i.test(produtoLoja.nome) ? "GRAY" :
                                                                                                /LITE GREEN/i.test(produtoLoja.nome) ? "GREEN" :
                                                                                                    /LITE REEN/i.test(produtoLoja.nome) ? "GREEN" :
                                                                                                        /ORANGE/i.test(produtoLoja.nome) ? "ORANGE" :
                                                                                                            /CHARCOAL/i.test(produtoLoja.nome) ? "CHARCOAL" :
                                                                                                                /SILVER/i.test(produtoLoja.nome) ? "SILVER" :
                                                                                                                    /LIGHT BLU/i.test(produtoLoja.nome) ? "BLUE" :
                                                                                                                        /TWILIGHT/i.test(produtoLoja.nome) ? "BLUE" :
                                                                                                                            /GRAPHITE G/i.test(produtoLoja.nome) ? "GRAY" :
                                                                                                                                /GRAPHITE/i.test(produtoLoja.nome) ? "GRAY" :
                                                                                                                                    /YE/i.test(produtoLoja.nome) ? "YELLOW" :
                                                                                                                                        /LAVENDER P/i.test(produtoLoja.nome) ? "PURPLE" :
                                                                                                                                            /LIGHT GRE/i.test(produtoLoja.nome) ? "GRAY" :
                                                                                                                                                /BLU/i.test(produtoLoja.nome) ? "BLUE" :
                                                                                                                                                    /STAR/i.test(produtoLoja.nome) ? "BLUE" :
                                                                                                                                                        /GR/i.test(produtoLoja.nome) ? "GRAY" :
                                                                                                                                                            /GRAPHI/i.test(produtoLoja.nome) ? "GRAY" :
                                                                                                                                                                /MIDNIG/i.test(produtoLoja.nome) ? "BLACK" :
                                                                                                                                                                    /SKY BL/i.test(produtoLoja.nome) ? "BLUE" :
                                                                                                                                                                        /MID/i.test(produtoLoja.nome) ? "BLACK" :
                                                                                                                                                                            /ONYX/i.test(produtoLoja.nome) ? "GRAY" :
                                                                                                                                                                                /OCEAN/i.test(produtoLoja.nome) ? "OCEAN" :
                                                                                                                                                                                    /CARBON/i.test(produtoLoja.nome) ? "BLACK" :
                                                                                                                                                                                        null;


            const origem =
                /INDIA/i.test(produtoLoja.nome) ? "INDIA" :
                    /GLOBAL/i.test(produtoLoja.nome) ? "GLOBAL" :
                        /GLOB/i.test(produtoLoja.nome) ? "GLOBAL" :
                            /GLO/i.test(produtoLoja.nome) ? "GLOBAL" :
                                /INDONESIA/i.test(produtoLoja.nome) ? "INDONESIA" :
                                    /INDI/i.test(produtoLoja.nome) ? "INDIA" :
                                        produtoLoja.nome.endsWith("G") ? "GLOBAL" :
                                            null;


            const marca = /XIAOMI/i.test(produtoLoja.nome) ? "XIAOMI" : null;



            let posicaoUltimoDS = produtoLoja.nome.lastIndexOf("DS");
            let novoNome = produtoLoja.nome.substring(0, posicaoUltimoDS + 2).trim().replace("DS", ""); // +2 para incluir o "DS"

            //  let novoNome = produtoLoja.nome;

            if (origem) novoNome = novoNome.replace(/INDIA|GLOBAL|INDONESIA|GLOB|GLO/gi, '');
            if (cor) novoNome = novoNome.replace(/BLACK|MINT GREEN|MINT REE|PURPLE|BLUE|LITE PINK|PEBBLE WHITE|WHITE|AURORA GREEN|AURORA|CORAL GREEN|GRAY|CORAL|LITE GREEN|LITE REEN|GREY|GREEN|ORANGE|CHARCOAL|SILVER|LIGHT BLU|MINT GREE|TWILIGHT|TWILIHT|GREE|GRAPHITE G|GRAPHITE|BLAC|PEPPY PURPLE|INDI|YE|BLAC|LAVENDER P|LIGHT GRE|BLU|STAR|GR|GLACIE|GRAPHI|MIDNIG|SKY BL|MID|ONYX|OCEAN|CARBON/gi, '');
            if (rede) novoNome = novoNome.replace(/\b4g\b|\b4G\b|\b5g\b|\b5G\b/gi, '');
            if (capacidade) novoNome = novoNome.replace(new RegExp(/\b32GB\b|\b64GB\b|\b128GB\b|\b256GB\b|\b512GB\b/gi, 'i'), '');
            if (ram) novoNome = novoNome.replace(new RegExp(/\b2RAM\b|\b3RAM\b|\b4RAM\b|\b6RAM\b|\b8RAM\b|\b12RAM\b|\b16RAM\b/gi, 'i'), '');
            if (marca) novoNome = novoNome.replace(/XIAOMI/gi, '');
            novoNome = novoNome.replace(/CEL/gi, '').replace(/\s+/g, ' ').trimStart();

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
