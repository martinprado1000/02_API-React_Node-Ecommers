import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import { useUsersContext } from "../../contexts/UsersContext";
import { useNavigate, Link, useSearchParams } from "react-router-dom";

import {
  flexRender,
  useReactTable,
  getCoreRowModel,
} from "@tanstack/react-table"; // tanstack

function BodyUsers() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const { getUsers, users } = useUsersContext();
  useEffect(() => {
    getUsers();
  }, []);

  //  function SimpleTable() {

  // Este arreglo es lo que va a mostrar en los encabezados, lo llamo desde useReactTable
  const columns = [
    {
      header: "ID",
      accessorKey: "id",
      footer: "ID"
    },
    {
      header: "Nombre",
      accessorKey: "name",
      footer: "Nombre",
    },
    {
      header: "Apellido",
      accessorKey: "lastname",
      footer: "Apellido",
    },
    {
      header: "Email",
      accessorKey: "email",
      footer: "Email",
    },
    {
      header: "Edad",
      accessorKey: "age",
      footer: "Edad",
    },
    {
      header: "Rol",
      accessorKey: "rol",
      footer: "Rol",
    },
  ];

  const table = useReactTable({
    data: users.payload, // data son los datos que voy a mostar en la lista
    columns, // columns son los valores de las columnas que voy a mostrar en los encabezados
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    
    <div className="container mt-3">
      <Table striped bordered hover variant="dark">
        <thead>
          {table.getHeaderGroups().map(
            (
              headerGroup //Recorro los encabezados para generar un th por cada uno.
            ) => (
              <tr className="row" key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th className="col-auto" key={header.id}> 
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            )
          )}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => ( //Recorro las filas para generar un td por cada uno.
            <tr className="row" key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td className="col-auto" key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>


    </div>
  );
}

export default BodyUsers;
