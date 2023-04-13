import React from "react";
import { Pagination } from "react-bootstrap";
import "./PaginationComponent.css";

interface IPaginationButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  active?: boolean;
  className?: string;
}

interface IPaginationProps<T> {
  items?: T[] | null;
  pageSize: number;
  onPageChange?: (currentPage: number) => void;
  currentPage?: number;
}

export class PaginationComponentProduto<T> extends React.Component<IPaginationProps<T>> {
  private get totalPages() {
    const { items, pageSize } = this.props;
    return items ? Math.ceil(items.length / pageSize) : 0;
  }

  handlePageChange(page: number) {
    this.props.onPageChange && this.props.onPageChange(page);
  }

  render() {
    const { currentPage = 1 } = this.props;
    const maxPagesToShow = 10;

    const CustomPaginationButton: React.FC<IPaginationButtonProps> = ({
      children,
      onClick,
      active,
      className,
      ...props
    }) => (
      <Pagination.Item
        {...props}
        active={active}
        onClick={onClick}
        className={`page-item ${className}`}
      >
        <span>{children}</span>
      </Pagination.Item>
    );

    const startPage = Math.max(
      1,
      Math.min(currentPage - Math.floor(maxPagesToShow / 2), this.totalPages - maxPagesToShow + 1)
    );
    const endPage = Math.min(this.totalPages, startPage + maxPagesToShow - 1);

    return (
      <Pagination className=" px-3 ">
        <CustomPaginationButton onClick={() => this.handlePageChange(1)}>Primeiro</CustomPaginationButton>
        <CustomPaginationButton onClick={() => currentPage > 1 && this.handlePageChange(currentPage - 1)}>
          Anterior
        </CustomPaginationButton>

        {startPage > 1 && <CustomPaginationButton onClick={() => { }}>...</CustomPaginationButton>}

        {Array.from({ length: endPage - startPage + 1 }, (_, i) => i + startPage).map((page) => (
          <CustomPaginationButton
            key={page}
            active={page === currentPage}
            onClick={() => this.handlePageChange(page)}
            className="pagination-button"
          >
            {page}
          </CustomPaginationButton>
        ))}

        {endPage < this.totalPages && <CustomPaginationButton onClick={() => { }}>...</CustomPaginationButton>}

        <CustomPaginationButton
          onClick={() => currentPage < this.totalPages && this.handlePageChange(currentPage + 1)}
        >
          Próximo
        </CustomPaginationButton>
        <CustomPaginationButton onClick={() => this.handlePageChange(this.totalPages)}>Último</CustomPaginationButton>
      </Pagination>
    );
  }
}