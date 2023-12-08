import { createContext } from 'react';
export const SearchContext = createContext({
    globalFilter: '',
    setGlobalFilter:(searchQuery:string)=>{}});
