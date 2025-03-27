import { useOutletContext } from "react-router-dom";
import { DataTable } from "../components/data-table/DataTable"

export default function Content() {
  const table = useOutletContext();

  return (
    <div>
      <h1 className="text-lg font-semibold text-gray-900 sm:text-xl dark:text-gray-50">
        {table.selectedTable ? `Table: ${table.selectedTable}` : "Select a table"}
      </h1>
      <div className="mt-4 sm:mt-6 lg:mt-10">
        {table.selectedTable && <DataTable tableName={table.selectedTable} dbConfig={table.selectedDbConfig} />}
      </div>
    </div>
  )
}
