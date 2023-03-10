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
                </tr>
            </thead>
            <tbody>
                {listFreteiro && listFreteiro.map(freteiro => (
                    <tr key={freteiro.id} onClick={() => handleFreteiroSelect(freteiro)} style={{ cursor: 'pointer' }}>
                        <td><input type="checkbox" checked={selectedIds.has(freteiro.id)} /></td>
                        <td><b>{freteiro.id}</b></td>
                        <td><b className="th250">{freteiro.nome}</b></td>
                        <td className="tdValue"><b>R$: {(freteiro.fixo / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</b></td>
                        <td className="tdValue"><b>{freteiro.percentual}%</b></td>
                        <td><b>{freteiro.prioridade}</b></td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}
