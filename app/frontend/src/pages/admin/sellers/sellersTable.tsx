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
} from "../../../components/ui/select";

import {
  RankingInfo,
  rankItem,
  compareItems,
} from "@tanstack/match-sorter-utils";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { ClientContext } from "../../../context/clientContext";
import { redirect, useNavigate } from "react-router-dom";
import { SearchContext } from "../../../context/searchContext";
import { Checkbox } from "../../../components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import { toast } from "../../../components/ui/use-toast";
import { Seller } from "@/interface/seller";

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
const tempData: Seller[] = [
  {
    id:1,
    mainSellerName:"test",
    mainSellerMail:"test",
    subSellerName :"test",
    subSellerMail :"test",
    code:"test"}
];
export function SellersTable(props: {
  setSeller: (seller: Seller) => void,
  seller: Seller | undefined,
}) {
  const { globalFilter, setGlobalFilter } = React.useContext(SearchContext);
  const navigate = useNavigate();
  const rerender = React.useReducer(() => ({}), {})[1];
  const [edit, setEdit] = React.useState<CheckedState>();
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const columns = React.useMemo<ColumnDef<Seller, any>[]>(
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
              props.setSeller(row.original);
              setEdit(!!value);
            }}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "mainSellerName",
        id: "mainSellerName",
        header: "Main Seller Name",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        filterFn: "fuzzy",
        sortingFn: fuzzySort,
      },
      {
        accessorKey: "mainSellerMail",
        header: () => "Main Seller Mail",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "subSellerName",
        header: "Sub Seller Name",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "subSellerMail",
        header: "Sub Seller Mail",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "code",
        header: "Code",
        footer: (props) => props.column.id,
      },
    ],
    []
  );
  const [error, setError] = React.useState("");

  const [data, setData] = React.useState<Seller[]>([]);
  //const refreshData = () => setData((old) => makeData(50000));
  const [rowSelection, setRowSelection] = React.useState({});
  const fetchData = async () => {
    const response = await fetch(
      "https://data-visualizer-production.up.railway.app/sellers",
      {
        method: "GET",
        headers: { "Content-Type": "application/json", "Origin": "*" },
      }
    );

    const content = await response.json();
    if (content) {
      setData(content);
      setError("");
      toast({
        title: "Data Fetched Successfully",
      });
    } else {
      setError(content.message);
    }
  };
  React.useEffect(() => {
    fetchData();
  }, []);
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

  const handleDelete = async () => {
    const response = await fetch(
      `http://localhost:3000/sellers/${props.seller?.id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );
    const content = await response.json();
    if (content.affected === 1) {
      fetchData();
    }
  };

  return (
    <>
      <p className="text-center text-3xl font-extrabold my-4">
        Sellers
      </p>
      <div className="flex gap-4 m-6">
        <Button variant={"secondary"} onClick={() => navigate("/addSeller")}>
          Add
        </Button>
        {edit && (
          <>
            <Button
              variant={"secondary"}
              onClick={() => navigate("/editSeller")}
            >
              Edite
            </Button>
            <Button variant={"secondary"} onClick={() => handleDelete()}>
              Delete
            </Button>
          </>
        )}
      </div>
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
