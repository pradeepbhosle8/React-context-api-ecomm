import { useState, useContext, createContext } from "react";

const SearchFilterContext = createContext();
// console.log(AuthContext);

const SearchFilterProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    keyword: "",
    results: [],
  });

  return (
    <SearchFilterContext.Provider value={[auth, setAuth]}>
      {children}
    </SearchFilterContext.Provider>
  );
};

// custom hooks

const useSearchFilter = () => useContext(SearchFilterContext);
export { useSearchFilter, SearchFilterProvider };
