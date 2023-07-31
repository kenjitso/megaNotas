interface IProps {
    css?: string,
    displayText?: string,
    sortKey?: string,
    sortBy?: string,
    sortOrder?: "desc" | "asc",
    handleSort?: (key: string) => void
}

export function SortableTableHeader({ css, displayText, sortKey, handleSort, sortOrder, sortBy }: IProps) {
    const onHeaderClick = () => {
        if (sortKey && typeof handleSort === 'function') {
            handleSort(sortKey);
        }
    };

    return (
        <th className={css} onClick={onHeaderClick} >
            <div className="thArrow">
                <span>{displayText}</span>
                <span>
                    {sortKey && sortBy ? (sortBy === sortKey ? (sortOrder === "desc" ? "▲" : "▼") : "") : ""}
                </span>
            </div>
        </th>
    );
}
