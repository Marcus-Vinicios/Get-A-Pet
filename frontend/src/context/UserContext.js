import React, { createContext } from "react";

import useAuth from "../hooks/useAuth";


const Context = createContext();

function UserProvider({ children }) {
  const { auth, loading, register, login, logout } = useAuth();

  return (
    <Context.Provider
      value={{ loading, auth, register, login, logout }}
    >
      { children }
    </Context.Provider>
  );
}

export { Context, UserProvider };
