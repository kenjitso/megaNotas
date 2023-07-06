import { useState } from "react";

export function compareValues(key: string, order = 'asc') {
  return function innerSort(a: any, b: any) {
    let varA, varB;
    
    if (key === "competidores[0].produto.preco") {
      varA = a.competidores[0]?.produto?.preco;
      varB = b.competidores[0]?.produto?.preco;
    } else {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0;
      }
      varA = (typeof a[key] === 'string')
        ? a[key].toUpperCase() : a[key];
      varB = (typeof b[key] === 'string')
        ? b[key].toUpperCase() : b[key];
    }

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return (
      (order === 'desc') ? (comparison * -1) : comparison
    );
  };
}



export function useSort<T>(defaultSortBy: string) {
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("asc");
  const [sortBy, setSortBy] = useState<string>(defaultSortBy);

  function handleSort(key: string) {
    setSortBy(key);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
}


  return { sortOrder, sortBy, handleSort };
}



export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
