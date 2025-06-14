import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRoot,
  TableRow,
} from "./tremor/Table";
import { DbConfig } from "../types/dbTypes";
import { columns } from "./data-table/columns";

interface ExampleTableProps {
  tableName: string;
  dbConfig: DbConfig;
}

export function ExampleTable({ tableName, dbConfig }: ExampleTableProps) {
  const [data, setData] = useState<any[]>([]); // Estado para los datos de la tabla
  const API_URL = `http://localhost:8080/api/show-data/${tableName}`; // Incluir el nombre de la tabla en la URL

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        const response = await axios.post(API_URL, dbConfig); // Enviar solo dbConfig en el cuerpo
        setData(response.data);
      } catch (error) {
        console.error("Error fetching table data:", error);
      }
    };
    fetchTableData();
  }, [tableName, API_URL, dbConfig]);

  const tableColumns = columns(data);

  return (
    <TableRoot>
      <Table>
        <TableCaption>Data from {tableName}</TableCaption>
        <TableHead>
          <TableRow>
            {tableColumns.map((column) => (
              <TableHeaderCell key={column.id}>
                {column.meta?.displayName || column.id}
              </TableHeaderCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              {Object.values(row).map((value, idx) => (
                <TableCell key={idx}>{String(value)}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableRoot>
  );
}