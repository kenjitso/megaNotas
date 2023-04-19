import React from "react";
import { Pagination } from "react-bootstrap";
import "./PaginationComponent.css"

interface IPaginationButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  active?: boolean;
}

interface IPaginationProps<T> {
  items: number;
  pageSize: number;
  onPageChange?: (currentPage: number) => void;
  currentPage?: number;
}

export class PaginationComponent<T> extends React.Component<IPaginationProps<T>> {
  private get totalPages() {
    const { items, pageSize } = this.props;
    return items ? Math.ceil(items / pageSize) : 0;
  }

  handlePageChange(page: number) {
    this.props.onPageChange && this.props.onPageChange(page);
  }

  render() {
    const { currentPage = 1 } = this.props; // Define um valor padrão para currentPage, caso não esteja presente

    const CustomPaginationButton: React.FC<IPaginationButtonProps> = ({
      children,
      onClick,
      active,
      ...props
    }) => (
      <Pagination.Item {...props} active={active} onClick={onClick} className="page-item">
        <span>{children}</span>
      </Pagination.Item>
    );

    return (
      <Pagination className=" px-3 ">
        <CustomPaginationButton onClick={() => this.handlePageChange(1)}>   &lt;&lt;</CustomPaginationButton>
        <CustomPaginationButton onClick={() => currentPage > 1 && this.handlePageChange(currentPage - 1)}>
          &lt;
        </CustomPaginationButton>

        {Array.from({ length: this.totalPages }, (_, i) => i + 1).map((page) => (
          <CustomPaginationButton
            key={page}
            active={page === currentPage}
            onClick={() => this.handlePageChange(page)}
          >
            {page}
          </CustomPaginationButton>
        ))}

        <CustomPaginationButton
          onClick={() => currentPage < this.totalPages && this.handlePageChange(currentPage + 1)}
        >
          &gt;
        </CustomPaginationButton>
        <CustomPaginationButton onClick={() => this.handlePageChange(this.totalPages)}>&gt;&gt;</CustomPaginationButton>
      </Pagination>
    );
  }
}