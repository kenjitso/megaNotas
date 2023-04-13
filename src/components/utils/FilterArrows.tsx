import { useState } from "react";

export function compareValues<T>(a: T, b: T, sortOrder: "asc" | "desc"): number {
  if (a === b) return 0;
  const result = a > b ? 1 : -1;
  return sortOrder === "asc" ? result : -result;
}

export function useSort<T>(defaultSortBy: keyof T) {
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("asc");
  const [sortBy, setSortBy] = useState<keyof T>(defaultSortBy);

  function handleSort(newSortBy: keyof T) {
    if (newSortBy === sortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortOrder("desc");
      setSortBy(newSortBy);
    }
  }

  return { sortOrder, sortBy, handleSort };
}


export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
