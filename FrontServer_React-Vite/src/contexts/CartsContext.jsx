import { createContext, useContext, useState } from "react";

const CartsContext = createContext();

// Este es nuestro hook que exporta el contexto
export function useCartsContext() {
  return useContext(CartsContext);
}

// Provider
export function CartsProvider({ children }) {

const [carts, setCarts] = useState(false)

  const getCarts = async () => {
    try {
      let res = await fetch("http://localhost:8080/api/carts");
      let responsBackend = await res.json();
      if (responsBackend.status !== 200) {
        throw error({"error":responsBackend})
      }
      
      setCarts(responsBackend.data) 
      return;

    } catch (error) {
      console.log(`Error inesperado en el sistema: ${error}`);
      window.location.href = "/fatalErrorPage";
      return;
    }
  };

  return (
    <CartsContext.Provider value={{ getCarts, carts, setCarts }}>
      {children}
    </CartsContext.Provider>
  );
}
