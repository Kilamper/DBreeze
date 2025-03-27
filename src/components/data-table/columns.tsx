"use client"

import { Checkbox } from "../tremor/Checkbox"
import { ColumnDef, createColumnHelper } from "@tanstack/react-table"
import { DataTableColumnHeader } from "./DataTableColumnHeader"
import { DataTableRowActions } from "./DataTableRowActions"
import { useEffect, useState } from "react"

const columnHelper = createColumnHelper<any>()

export const columns = (data: Array<Record<string, any>>) => {
  const schema = data.length > 0
    ? Object.keys(data[0]).map((key) => ({ id: key, label: key }))
    : [];

  const dynamicColumns = schema.map((field) =>
    columnHelper.accessor(field.id, {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={field.label} />
      ),
      enableSorting: true,
      meta: {
        className: "text-left",
        displayName: field.label,
      },
    })
  );

  return [
    columnHelper.display({
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected()
              ? true
              : table.getIsSomeRowsSelected()
                ? "indeterminate"
                : false
          }
          onCheckedChange={() => table.toggleAllPageRowsSelected()}
          className="translate-y-0.5"
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={() => row.toggleSelected()}
          className="translate-y-0.5"
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
      meta: {
        displayName: "Select",
      },
    }),
    ...dynamicColumns,
    columnHelper.display({
      id: "edit",
      header: "Edit",
      enableSorting: false,
      enableHiding: false,
      meta: {
        className: "text-right",
        displayName: "Edit",
      },
      cell: ({ row }) => <DataTableRowActions row={row} />,
    }),
  ] as ColumnDef<any>[];
}

// Example usage: Fetch schema from API and pass it to the columns function
export const useDynamicColumns = () => {
  const [schema, setSchema] = useState<Array<{ id: string; label: string }>>([])

  useEffect(() => {
    async function fetchSchema() {
      const response = await fetch("/api/schema")
      const data = await response.json()
      setSchema(data)
    }
    fetchSchema()
  }, [])

  return columns(schema)
}
