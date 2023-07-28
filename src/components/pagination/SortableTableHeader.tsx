

interface IProps {
    css: string,
    displayText: string,
    sortKey: string,
    sortBy: string,
    sortOrder: "desc" | "asc",
    handleSort: (key: string) => void
}


export function SortableTableHeader({ css, displayText, sortKey, handleSort, sortOrder, sortBy }: IProps) {
    return (
        <th className={css} onClick={() => handleSort(sortKey)} >
            <div className="thArrow">
                <span>{displayText}</span>
                <span>
                    {sortBy === sortKey ? (sortOrder === "desc" ? "▲" : "▼") : ""}
                </span>
            </div>
        </th>
    );
}
