import { columns } from "../components/data-table/columns"
import { DataTable } from "../components/data-table/DataTable"

export default function Content() {
  return (
    <>
      <h1 className="text-lg font-semibold text-gray-900 sm:text-xl dark:text-gray-50">
        Content
      </h1>
      <div className="mt-4 sm:mt-6 lg:mt-10">
        <DataTable tableName="" columns={columns} />
      </div>
    </>
  )
}
