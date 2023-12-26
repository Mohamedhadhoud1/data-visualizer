"use client";

import * as React from "react";
import {
  Column,
  Table as Table1,
  useReactTable,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  sortingFns,
  getSortedRowModel,
  FilterFn,
  SortingFn,
  ColumnDef,
  flexRender,
  FilterFns,
} from "@tanstack/react-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

import {
  RankingInfo,
  rankItem,
  compareItems,
} from "@tanstack/match-sorter-utils";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { ClientContext } from "../../context/clientContext";
import { redirect, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/searchContext";
import { Checkbox } from "../../components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import { toast } from "../../components/ui/use-toast";
import { ClientData } from "@/interface/ClientData";

declare module "@tanstack/table-core" {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}
const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
  let dir = 0;

  // Only sort by rank if the column has ranking information
  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(
      rowA.columnFiltersMeta[columnId]?.itemRank!,
      rowB.columnFiltersMeta[columnId]?.itemRank!
    );
  }

  // Provide an alphanumeric fallback for when the item ranks are equal
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
};
const tempData: ClientData[] = [
  {
    folderNumber: "N° 39412668451",
    salesAmount: "3,200.00 €",
    seller: "Amine",
    name: "BACHIR Ridwane",
    mail: "Ridwane69310@icloud.com",
    course: "CREATION D'ENTREPRISE",
    dateStartCourse: "11/10/2023",
    dateEndCourse: "25/10/2023",
    courseAcivated: "OUI",
    courseLink: "https://app.digiforma.com/r/80Lislhu",
    courseCode: "test",
  },
  {
    folderNumber: "N° 39412668451",
    salesAmount: "3,200.00 €",
    seller: "Amine",
    name: "BACHIR Ridwane",
    mail: "Ridwane69310@icloud.com",
    course: "CREATION D'ENTREPRISE",
    dateStartCourse: "11/10/2023",
    dateEndCourse: "25/10/2023",
    courseAcivated: "OUI",
    courseLink: "https://app.digiforma.com/r/80Lislhu",
    courseCode: "test",
  },
  {
    folderNumber: "N° 39412668451",
    salesAmount: "3,200.00 €",
    seller: "Amine",
    name: "BACHIR Ridwane",
    mail: "Ridwane69310@icloud.com",
    course: "CREATION D'ENTREPRISE",
    dateStartCourse: "11/10/2023",
    dateEndCourse: "25/10/2023",
    courseAcivated: "OUI",
    courseLink: "https://app.digiforma.com/r/80Lislhu",
    courseCode: "test",
  },
  {
    folderNumber: "N° 39412668451",
    salesAmount: "3,200.00 €",
    seller: "Amine",
    name: "BACHIR Ridwane",
    mail: "Ridwane69310@icloud.com",
    course: "CREATION D'ENTREPRISE",
    dateStartCourse: "11/10/2023",
    dateEndCourse: "25/10/2023",
    courseAcivated: "OUI",
    courseLink: "https://app.digiforma.com/r/80Lislhu",
    courseCode: "test",
  },
  {
    folderNumber: "N° 39412668451",
    salesAmount: "3,200.00 €",
    seller: "Amine",
    name: "BACHIR Ridwane",
    mail: "Ridwane69310@icloud.com",
    course: "CREATION D'ENTREPRISE",
    dateStartCourse: "11/10/2023",
    dateEndCourse: "25/10/2023",
    courseAcivated: "OUI",
    courseLink: "https://app.digiforma.com/r/80Lislhu",
    courseCode: "test",
  },
  {
    folderNumber: "N° 39412668451",
    salesAmount: "3,200.00 €",
    seller: "Amine",
    name: "BACHIR Ridwane",
    mail: "Ridwane69310@icloud.com",
    course: "CREATION D'ENTREPRISE",
    dateStartCourse: "11/10/2023",
    dateEndCourse: "25/10/2023",
    courseAcivated: "OUI",
    courseLink: "https://app.digiforma.com/r/80Lislhu",
    courseCode: "test",
  },
];
export function SubSellersDataTable(props:{data:ClientData[]}) {
  const { client, setClient } = React.useContext(ClientContext);
  const { globalFilter, setGlobalFilter } = React.useContext(SearchContext);
  const navigate = useNavigate();
  const rerender = React.useReducer(() => ({}), {})[1];
  const [edit, setEdit] = React.useState<CheckedState>();
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const columns = React.useMemo<ColumnDef<ClientData, any>[]>(
    () => [
      {
        id: "select",
        header: "",
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => {
              table.getRowModel().rows.forEach((otherRow) => {
                if (otherRow.id !== row.id) {
                  otherRow.toggleSelected(false);
                }
              });
              row.toggleSelected(!!value);
              setClient(row.original);
              setEdit(!!value);
            }}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "name",
        id: "Nom du titulaire",
        header: "Name",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        filterFn: "fuzzy",
        sortingFn: fuzzySort,
      },
      {
        accessorKey: "courseLink",
        header: () => "LIEN DIGIFORMA",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "salesAmount",
        header: () => <span>Montant de vente</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "dateStartCourse",
        header: "Date de debut",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "dateEndCourse",
        header: "Date de fin",
        footer: (props) => props.column.id,
      },
    ],
    []
  );
  const [error, setError] = React.useState("");

  const [data, setData] = React.useState<ClientData[]>(props?.data);
  const [rowSelection, setRowSelection] = React.useState({});
  
  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      columnFilters,
      globalFilter,
      rowSelection,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    onRowSelectionChange: setRowSelection,
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });

  React.useEffect(() => {
    if (table.getState().columnFilters[0]?.id === "fullName") {
      if (table.getState().sorting[0]?.id !== "fullName") {
        table.setSorting([{ id: "fullName", desc: false }]);
      }
    }
  }, [table.getState().columnFilters[0]?.id]);

 

  return (
    <> {edit && (
            <Button variant={"secondary"} onClick={() => navigate("/clients")} className="m-6">
              Show Data
            </Button>)}
      <div className="w-11/12 sm:w-4/5 mx-auto my-10">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder ? null : (
                          <>
                            <div
                              {...{
                                className: header.column.getCanSort()
                                  ? "cursor-pointer select-none"
                                  : "",
                                onClick:
                                  header.column.getToggleSortingHandler(),
                              }}
                            >
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                              {{
                                asc: " 🔼",
                                desc: " 🔽",
                              }[header.column.getIsSorted() as string] ?? null}
                            </div>
                            {/* {header.column.getCanFilter() ? (
                            <div>
                              <Filter column={header.column} table={table} />
                            </div>
                          ) : null} */}
                          </>
                        )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className=""
                    //   onClick={() => {
                    //     setClient(row.original);
                    //     navigate("/clients");
                    //   }}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center space-x-2 space-y-4 py-4">
          <div className="space-x-2">
            <Button
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              {"<<"}
            </Button>
            <Button
              variant={"secondary"}
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {"<"}
            </Button>
            <Button
              variant={"secondary"}
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              {">"}
            </Button>
            <Button
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              {">>"}
            </Button>
          </div>
          <div className="flex-1 text-sm text-muted-foreground text-center">
            <span className="flex items-center gap-1">
              <div>Page</div>
              <strong>
                {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </strong>
            </span>{" "}
          </div>
          <div className="flex-1 text-muted-foreground">
            <span className="flex items-center gap-1 mx-auto justify-center">
              Go to page:
              <Input
                type="number"
                defaultValue={table.getState().pagination.pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  table.setPageIndex(page);
                }}
                className="border p-1 rounded w-1/2"
              />
            </span>
          </div>
          <div className="flex-1 text-sm">
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(e) => {
                table.setPageSize(Number(e));
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Table Size" />
              </SelectTrigger>
              <SelectContent>
                {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    Show {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </>
  );
}

function Filter({
  column,
  table,
}: {
  column: Column<any, unknown>;
  table: Table1<any>;
}) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  const sortedUniqueValues = React.useMemo(
    () =>
      typeof firstValue === "number"
        ? []
        : Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column.getFacetedUniqueValues()]
  );

  return typeof firstValue === "number" ? (
    <div>
      <div className="flex space-x-2">
        <DebouncedInput
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
          value={(columnFilterValue as [number, number])?.[0] ?? ""}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [value, old?.[1]])
          }
          placeholder={`Min ${
            column.getFacetedMinMaxValues()?.[0]
              ? `(${column.getFacetedMinMaxValues()?.[0]})`
              : ""
          }`}
          className="w-24 border shadow rounded"
        />
        <DebouncedInput
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
          value={(columnFilterValue as [number, number])?.[1] ?? ""}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [old?.[0], value])
          }
          placeholder={`Max ${
            column.getFacetedMinMaxValues()?.[1]
              ? `(${column.getFacetedMinMaxValues()?.[1]})`
              : ""
          }`}
          className="w-24 border shadow rounded"
        />
      </div>
      <div className="h-1" />
    </div>
  ) : (
    <>
      <datalist id={column.id + "list"}>
        {sortedUniqueValues.slice(0, 5000).map((value: any) => (
          <option value={value} key={value} />
        ))}
      </datalist>
      <DebouncedInput
        type="text"
        value={(columnFilterValue ?? "") as string}
        onChange={(value) => column.setFilterValue(value)}
        placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
        className="w-36 border shadow rounded"
        list={column.id + "list"}
      />
      <div className="h-1" />
    </>
  );
}

// A debounced input react component
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <Input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
