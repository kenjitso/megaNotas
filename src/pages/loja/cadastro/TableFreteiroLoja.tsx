import { IFreteiro } from "@/datatypes/freteiro";
import { useState } from "react";
import { Table } from "react-bootstrap";

interface IProps {
    listFreteiro: IFreteiro[] | null;
    selectedFreteiros?: string[]
    onUpdateFreteiro: (freteiros: string[]) => void;
}

export function TableFreteiroLoja({ listFreteiro, selectedFreteiros, onUpdateFreteiro }: IProps) {
    const [selectedIds, setSelectedIds] = useState(new Set(selectedFreteiros));

    const handleFreteiroSelect = (freteiro: IFreteiro) => {
        const newSelectedIds = new Set(selectedIds);
        if (newSelectedIds.has(freteiro.id)) {
            newSelectedIds.delete(freteiro.id);
        } else {
            newSelectedIds.add(freteiro.id);
        }
        setSelectedIds(newSelectedIds);
        onUpdateFreteiro([...newSelectedIds]);
    };

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th></th>
                    <th scope="col">ID:</th>
                    <th scope="col">Nome:</th>
                    <th scope="col">Fixo:</th>
                    <th scope="col">Percentual:</th>
                    <th scope="col">Prioridade:</th>
                    <th scope="col">Valor Minimo:</th>
                    <th scope="col">Valor Maximo:</th>
                    <th scope="col">Global:</th>
                </tr>
            </thead>
            <tbody>
                {listFreteiro && listFreteiro.map(freteiro => (
                    <tr key={freteiro.id}>
                        <td><input type="checkbox" onChange={() => handleFreteiroSelect(freteiro)} checked={selectedIds.has(freteiro.id)} /></td>
                        <td><b>{freteiro.id}</b></td>
                        <td><b className="th250">{freteiro.nome}</b></td>
                        <td><b>{freteiro.fixo}</b></td>
                        <td><b>{freteiro.percentual}%</b></td>
                        <td><b>{freteiro.prioridade}</b></td>
                        <td className="tdValue"><b>R$: {freteiro.valor_min.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</b></td>
                        <td className="tdValue"><b>R$: {freteiro.valor_max.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</b></td>
                        <td><b>{freteiro.global === true ? "Sim" : freteiro.global === false ? "Não" : ""}</b></td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}
