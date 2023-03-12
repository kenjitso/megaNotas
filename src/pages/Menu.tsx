import { Icons } from "@/components/icons/icons";
import React, { useState, useEffect } from "react";
import { Col, InputGroup, FormControl, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

interface IMenuProps<T extends { nome: string }> {
  links: { label: string, url: string }[];
  showSearch: boolean;
  onListSearch?: (filtered: T[]) => void;
  listSearch?: T[];
  showCadAtu: boolean;
  onHandleSave?: () => void;
  onHandleToList?: () => void;
  buttonStats?: string;
}

export function Menu<T extends { nome: string; }>({ links, showSearch, onListSearch, listSearch, showCadAtu, onHandleSave, buttonStats, onHandleToList }: IMenuProps<T>) {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeButton, setActiveButton] = useState("");
  const [selectedButton, setSelectedButton] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchList, setSearchList] = useState<T[]>(listSearch ?? []);

  useEffect(() => {
    const currentPathname = location.pathname;
    const active = links.find(link => link.url === currentPathname);
    if (active) {
      setActiveButton(active.label);
      setSelectedButton(links.indexOf(active));
    }
  }, [location, links]);




  const handleSearch = () => {
    const filteredList = listSearch?.filter(item =>
      item.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchList(filteredList ?? []);

    if (onListSearch) {
      onListSearch(filteredList ?? []);
    }
  };

  const handleButtonClick = (url: string, label: string, index: number) => {
    setActiveButton(label);
    setSelectedButton(index);
    navigate(url);
  };

  return (
    <React.Fragment >
      <Col className=" py-3">
        <div className="d-flex justify-content-start align-items-center">
          <div className="d-flex">
            {links.map((link, index) => {
              const active = selectedButton === index || activeButton === link.label;
              return (
                <Button
                  style={{ whiteSpace: 'nowrap', borderRadius: '30px' }}
                  variant="success"
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
                <FormControl
                  style={{ width: "400px" }}
                  type="text"
                  placeholder="Pesquisar"
                  value={searchTerm}
                  maxLength={120}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
                />
              </InputGroup>
              <Button
                className="me-3 d-flex align-items-center justify-content-center"
                variant="success"
                onClick={handleSearch}
                style={{ borderRadius: '20px', width: '220px' }}
              >
                <Icons tipo="search" /><span className="ms-2">Buscar produto</span>
              </Button>
            </div>

          )}

{showCadAtu && (
  <div className="d-flex justify-content-between" style={{ marginLeft: "auto" }}>
    <Button className={`me-3`} variant="success" onClick={onHandleSave} style={{ borderRadius: '30px' }}>
      {buttonStats}
    </Button>
    <Button variant="success" onClick={onHandleToList} style={{ borderRadius: '30px' }}>
      Cancelar
    </Button>
  </div>
)}

        </div>
      </Col>
    </React.Fragment>
  );
}
