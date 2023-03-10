import { BsHouseDoor } from "react-icons/bs";
import { IoStorefrontOutline } from "react-icons/io5";
import { BsBoxSeam } from "react-icons/bs";
import { BsCart4 } from "react-icons/bs";
import { BsClockHistory } from "react-icons/bs";
import { BsFillCaretUpFill } from "react-icons/bs";
import { BsFillCaretDownFill } from "react-icons/bs";
import { VscEdit } from "react-icons/vsc";
import { BsTrash } from "react-icons/bs";



interface props {
    tipo: "nota" | "loja" | "casa" | "caixa" | "produto" | "historico" | "up" | "down" | "edit" | "trash"
}

export function Icons({ tipo }: props) {

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