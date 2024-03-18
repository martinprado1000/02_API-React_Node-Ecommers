import { createContext, useContext, useState } from "react";

const UsersContext = createContext();

// Este es nuestro hook que exporta el contexto
export function useUsersContext() {
  return useContext(UsersContext);
}

// Provider
export function UsersProvider({ children }) {

const [users, setUsers] = useState(false)

  const getUsers = async () => {
    try {
      let res = await fetch("http://localhost:8080/api/users");
      let responsBackend = await res.json();
      if (responsBackend.status !== 200) {
        throw error({"error":responsBackend})
      }
      setUsers(responsBackend.data) 
      return;

    } catch (error) {
      console.log(`Error inesperado en el sistema: ${error}`);
      window.location.href = "/fatalErrorPage";
      return;
    }
  };

  return (
    <UsersContext.Provider value={{ getUsers, users, setUsers }}>
      {children}
    </UsersContext.Provider>
  );
}
