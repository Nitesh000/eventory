import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn, generateArray } from "@/lib/utils";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  EyeClosedIcon,
  EyeOpenIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import {
  Column,
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { useState } from "react";

export type Event = {
  id: string;
  eventName: string;
  eventStart: Date;
  eventEnd: Date;
  clientName: string;
  contactInfo: string;
  venue: string;
};

// d175b6

const data: Event[] = [];

for (let i = 0; i < 50; i++) {
  data.push({
    id: i.toString(),
    eventName: "Filed Name",
    eventStart: new Date("2024-01-12"),
    eventEnd: new Date("2024-01-12"),
    clientName: "Muhammad Asad",
    contactInfo: "+1 234 567 890",
    venue: "Lorem ipsum dolor sit amet, qui minim ",
  });
}

export const columns: ColumnDef<Event>[] = [
  {
    id: "hide",
    cell: ({ row }) => (
      <>
        {row.getIsSelected() ? (
          <EyeClosedIcon onClick={() => row.toggleSelected(false)} />
        ) : (
          <EyeOpenIcon onClick={() => row.toggleSelected(true)} />
        )}
      </>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "eventName",
    header: ({ column }) => {
      return (
        <div className="flex justify-start items-center dark:text-white">
          Event Name
          {EventTable.chevrons(column)}
        </div>
      );
    },
  },
  {
    accessorKey: "eventStart",
    header: () => {
      return <div className="text-center dark:text-white">Event Start</div>;
    },
    cell: ({ row }) => {
      const date: Date = row.getValue("eventStart");
      const options: Intl.DateTimeFormatOptions = {
        month: "short",
        day: "2-digit",
        year: "numeric",
      };
      const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
        date,
      );

      return <div className="text-center">{formattedDate}</div>;
    },
  },
  {
    accessorKey: "eventEnd",
    header: ({ column }) => {
      return (
        <div className="flex justify-start items-center dark:text-white">
          Event End{EventTable.chevrons(column)}
        </div>
      );
    },
    cell: ({ row }) => {
      const date: Date = row.getValue("eventStart");
      const options: Intl.DateTimeFormatOptions = {
        month: "short",
        day: "2-digit",
        year: "numeric",
      };
      const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
        date,
      );

      return <div className="text-left">{formattedDate}</div>;
    },
  },
  {
    accessorKey: "clientName",
    header: ({ column }) => {
      return (
        <div className="flex justify-start items-center dark:text-white">
          Client Name
          {EventTable.chevrons(column)}
        </div>
      );
    },
  },
  {
    accessorKey: "contactInfo",
    header: () => {
      return <div className="text-center dark:text-white">Contact Info</div>;
    },
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("contactInfo")}</div>;
    },
  },
  {
    accessorKey: "venue",
    header: () => {
      return <div className="text-left dark:text-white">Venue</div>;
    },
  },
];

export function EventTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      rowSelection,
    },
  });

  return (
    <div className="w-full dark:bg-black dark:text-white border-2 border-[#d175b6] px-3 rounded-3xl">
      <div className="flex justify-between items-center py-4">
        <h3 className="ml-3 text-3xl">Event Requests</h3>
        <div className="flex gap-3 justify-center items-center">
          <Input
            placeholder="Event name..."
            value={
              (table.getColumn("eventName")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("eventName")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <Button
            size="icon"
            className={cn("bg-gradient-to-r from-pink-500 to-violet-500 ")}
          >
            <PlusIcon className={cn("dark:text-white")} />
          </Button>
        </div>
      </div>
      <div className="rounded-md">
        <Table className={cn("border border-[#d175b6]")}>
          <TableHeader className={cn("bg-[#d175b6]")}>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
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
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
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
      {/* NOTE: pagination */}
      <div className="flex justify-end items-center py-4 space-x-2">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        {/* <div className="space-x-2"> */}
        {/*   <Button */}
        {/*     variant="outline" */}
        {/*     size="sm" */}
        {/*     onClick={() => table.previousPage()} */}
        {/*     disabled={!table.getCanPreviousPage()} */}
        {/*   > */}
        {/*     Previous */}
        {/*   </Button> */}
        {/*   <Button */}
        {/*     variant="outline" */}
        {/*     size="sm" */}
        {/*     onClick={() => table.nextPage()} */}
        {/*     disabled={!table.getCanNextPage()} */}
        {/*   > */}
        {/*     Next */}
        {/*   </Button> */}
        {/* </div> */}
      </div>

      <Pagination className={cn("pb-2")}>
        <PaginationContent>
          <PaginationItem
            className={cn(!table.getCanPreviousPage() && "opacity-50")}
            aria-disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
          >
            <PaginationPrevious className={cn("cursor-pointer")} />
          </PaginationItem>
          {generateArray(table.getPageCount()).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                className={cn(
                  page === table.getState().pagination.pageIndex + 1 &&
                    "text-[#d175b6]",
                  "cursor-pointer",
                )}
                onClick={() => table.setPageIndex(page - 1)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem
            className={cn(!table.getCanNextPage() && "opacity-50")}
            aria-disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
          >
            <PaginationNext className={cn("cursor-pointer")} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

EventTable.chevrons = (column: Column<Event, unknown>) => (
  <Button
    size="extraSm"
    className={cn("rounded-full ml-2")}
    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  >
    {column.getIsSorted() === "desc" ? (
      <ChevronDownIcon className="dark:text-[#d175b6]" />
    ) : (
      <ChevronUpIcon className="dark:text-[#d175b6]" />
    )}
  </Button>
);
