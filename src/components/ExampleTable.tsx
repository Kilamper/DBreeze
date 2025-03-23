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
} from "../components/Table";
import { DbConfig } from "../types/dbTypes";

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
        console.log("Sending dbConfig:", dbConfig); // Agrega un log para verificar el contenido de dbConfig
        const response = await axios.post(API_URL, dbConfig); // Enviar solo dbConfig en el cuerpo
        setData(response.data);
      } catch (error) {
        console.error("Error fetching table data:", error);
      }
    };
    fetchTableData();
  }, [tableName, API_URL, dbConfig]);

  return (
    <TableRoot>
      <Table>
        <TableCaption>Data from {tableName}</TableCaption>
        <TableHead>
          <TableRow>
            {data.length > 0 &&
              Object.keys(data[0]).map((key) => (
                <TableHeaderCell key={key}>{key}</TableHeaderCell>
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