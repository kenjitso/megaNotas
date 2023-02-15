import { BsHouseDoor } from "react-icons/bs";
import { TbBuildingWarehouse } from "react-icons/Tb";
import { BsBoxSeam } from "react-icons/bs";
import { BsCart4 } from "react-icons/bs";
import { BsClockHistory } from "react-icons/bs";


interface props {
    tipo: "nota" | "loja" | "casa" | "caixa" | "produto" | "historico"
}

export function Icons({ tipo }: props) {

    if (tipo === "casa") {
        return (
            <BsHouseDoor size={32} />
        );
    }

    if (tipo === "loja") {
        return (
            <TbBuildingWarehouse size={32} />
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