import { BsHouseDoor } from "react-icons/bs";
import { IoStorefrontOutline } from "react-icons/io5";
import { BsBoxSeam } from "react-icons/bs";
import { BsCart4 } from "react-icons/bs";
import { BsClockHistory } from "react-icons/bs";
import { BsFillCaretUpFill } from "react-icons/bs";
import { BsFillCaretDownFill } from "react-icons/bs";
import { VscEdit } from "react-icons/vsc";
import { BsTrash } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa"
import { FaFlagUsa } from "react-icons/fa"
import { BiLink } from "react-icons/bi"
import { RxUpdate } from "react-icons/rx"
import { TbFileImport } from "react-icons/tb"
import { RxThickArrowLeft } from "react-icons/rx"
import { CgNotes } from "react-icons/cg"
import { CiImport } from "react-icons/ci"
import { FaFilter } from "react-icons/fa"
import { FaFileDownload } from "react-icons/fa"
import { HiViewList } from "react-icons/hi"


interface props {
    tipo: "nota" | "loja" | "casa" | "caixa" | "produto" | "historico" | "up" | "down" | "edit" | "trash" | "search" | "user" | "flag" | "link" | "update" | "import"
    | "voltar" | "cadastro" | "download" | "CiImport" | "filtro" | "downloadXLSX" | "listLimitPage"
    tamanho?: number
}

export function Icons({ tipo, tamanho }: props) {

    if (tipo === "listLimitPage") {
        return (
            <HiViewList size={tamanho} />
        );
    }

    if (tipo === "downloadXLSX") {
        return (
            <FaFileDownload size={tamanho} />
        );
    }

    if (tipo === "filtro") {
        return (
            <FaFilter size={tamanho} />
        );
    }

    if (tipo === "cadastro") {
        return (
            <CgNotes size={tamanho} />
        );
    }

    if (tipo === "voltar") {
        return (
            <RxThickArrowLeft size={24} />
        );
    }

    if (tipo === "import") {
        return (
            <TbFileImport size={tamanho} />
        );
    }

    if (tipo === "update") {
        return (
            <RxUpdate size={tamanho} />
        );
    }

    if (tipo === "CiImport") {
        return (
            <CiImport size={tamanho} />
        );
    }


    if (tipo === "link") {
        return (
            <BiLink size={18} />
        );
    }

    if (tipo === "flag") {
        return (
            <FaFlagUsa size={18} />
        );
    }

    if (tipo === "user") {
        return (
            <FaRegUserCircle size={40} />
        );
    }

    if (tipo === "search") {
        return (
            <BsSearch size={20} />
        );
    }

    if (tipo === "trash") {
        return (
            <BsTrash size={20} />
        );
    }

    if (tipo === "edit") {
        return (
            <VscEdit size={20} />
        );
    }


    if (tipo === "up") {
        return (
            <BsFillCaretUpFill size={12} />
        );
    }

    if (tipo === "down") {
        return (
            <BsFillCaretDownFill size={12} />
        );
    }

    if (tipo === "casa") {
        return (
            <BsHouseDoor size={32} />
        );
    }

    if (tipo === "loja") {
        return (
            <IoStorefrontOutline size={32} />
        );
    }

    if (tipo === "caixa") {
        return (
            <BsBoxSeam size={32} />
        );
    }

    if (tipo === "produto") {
        return (
            <BsCart4 size={32} />
        );

    }

    if (tipo === "historico") {
        return (
            <BsClockHistory size={32} />
        );

    }

    return (
        <></>
    );

}