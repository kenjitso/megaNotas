import React, { useState, useEffect } from "react";
import { Col, InputGroup, FormControl, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

interface IMenuProps<T extends { nome: string }> {
  links: { label: string, url: string }[];
  showSearch: boolean;
  onListSearch?: (filtered: T[]) => void;
  onListRefresh?: () => void;
  listSearch?: T[];
}

export function Menu<T extends { nome: string; }>({ links, showSearch, onListRefresh, onListSearch, listSearch }: IMenuProps<T>) {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeButton, setActiveButton] = useState("");
  const [selectedButton, setSelectedButton] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchList, setSearchList] = useState<T[]>(listSearch ?? []);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const currentPathname = location.pathname;
    const active = links.find(link => link.url === currentPathname);
    if (active) {
      setActiveButton(active.label);
      setSelectedButton(links.indexOf(active));
    }
  }, [location, links]);

  const handleRefreshClick = () => {
 
    if (onListRefresh) {
      onListRefresh();
    }
  };

  const handleSearch = () => {
    const filteredList = listSearch?.filter(item =>
      item.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchList(filteredList ?? []);
    setCurrentPage(1);

    if (onListSearch) {
      onListSearch(filteredList ?? []);
    }
  };



  const filteredList = searchList;

  const handleButtonClick = (url: string, label: string, index: number) => {
    setActiveButton(label);
    setSelectedButton(index);
    navigate(url);
  };

  return (
    <React.Fragment>
      <Col className=" py-3 ">
        <div className="d-flex justify-content-start align-items-center">
          <div className="d-flex">
            {links.map((link, index) => {
              const active = selectedButton === index || activeButton === link.label;
              return (
                <Button
                  variant="secondary"
                  key={index}
                  className={`me-3`}
                  active={active}
                  onClick={() => handleButtonClick(link.url, link.label, index)}
                >
                  {link.label}
                </Button>
              );
            })}
          </div>
          {showSearch && (
            <div className="d-flex">
              <InputGroup className="me-3">
                <FormControl style={{ width: "400px" }} type="text" placeholder="Pesquisar" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </InputGroup>
              <Button className={`me-3`} variant="secondary" onClick={handleSearch}>
                Pesquisar
              </Button>
              <Button className={`me-3`} variant="secondary" onClick={handleRefreshClick}>
                Atualizar
              </Button>
            </div>
          )}
        </div>
      </Col>
    </React.Fragment>
  );
}
