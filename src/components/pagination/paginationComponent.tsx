import { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";
import { IProduct } from "../../datas/data_utils";

interface CustomPaginationButtonProps {
    children: React.ReactNode;
    onClick: () => void;
    active?: boolean;
}

export function PaginationComponent(list: IProduct[] | null, pageSize: number) {
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);


    useEffect(() => {
        setTotalPages(list ? Math.ceil(list.length / pageSize) : 0);
    }, [list, pageSize]);



    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        // navigate(`/homeExpress?page=${page}`);
    };

    const CustomPaginationButton: React.FC<CustomPaginationButtonProps> = ({ children, onClick, active, ...props }) => (
        <Pagination.Item {...props} active={active} onClick={onClick} className="page-item" >
            <span>{children}</span>
        </Pagination.Item>
    );

    return (
        <Pagination>
            <CustomPaginationButton onClick={() => handlePageChange(1)}>
                Primeiro
            </CustomPaginationButton>
            <CustomPaginationButton
                onClick={() => {
                    if (currentPage > 1) handlePageChange(currentPage - 1);
                }}
            >
                Anterior
            </CustomPaginationButton>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <CustomPaginationButton
                    key={page}
                    active={page === currentPage}
                    onClick={() => handlePageChange(page)}
                >
                    {page}
                </CustomPaginationButton>
            ))}
            <CustomPaginationButton
                onClick={() => {
                    if (currentPage < totalPages) handlePageChange(currentPage + 1);
                }}
            >
                Próximo
            </CustomPaginationButton>
            <CustomPaginationButton onClick={() => handlePageChange(totalPages)}>
                Último
            </CustomPaginationButton>
        </Pagination>
    );

}