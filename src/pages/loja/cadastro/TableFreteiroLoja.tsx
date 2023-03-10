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

    const handleCheckboxChange = (id: string) => {
        const newSelectedIds = new Set(selectedIds);
        if (newSelectedIds.has(id)) {
            newSelectedIds.delete(id);
        } else {
            newSelectedIds.add(id);
        }
        setSelectedIds(newSelectedIds);
        onUpdateFreteiro([...newSelectedIds]);
    }

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th className="th40"></th>
                    <th scope="col" className="th70">ID</th>
                    <th scope="col" className="th200">Nome</th>
                    <th scope="col" className="th110">Fixo</th>
                    <th scope="col" className="th70">Percentual</th>
                    <th scope="col" className="th70">Prioridade</th>
                </tr>
            </thead>
            <tbody>
                {listFreteiro && listFreteiro.map(freteiro => (
                    <tr key={freteiro.id} onClick={() => handleCheckboxChange(freteiro.id)} style={{ cursor: 'pointer' }}>
                        <td><input type="checkbox" value={freteiro.id} checked={selectedIds.has(freteiro.id)} onChange={() => handleCheckboxChange(freteiro.id)} /></td>
                        <td>{freteiro.id}</td>
                        <td>{freteiro.nome}</td>
                        <td className="tdValue">R$: {(freteiro.fixo / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                        <td className="tdValue">{freteiro.percentual}%</td>
                        <td className="tdValue">{freteiro.prioridade}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}
