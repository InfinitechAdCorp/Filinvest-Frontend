"use client";

import React, {
  ReactElement,
  useState,
  useMemo,
  useCallback,
  ChangeEvent,
} from "react";
import { SearchIcon } from "../icons";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  Input,
  Card,
  CardBody,
  Selection,
} from "@heroui/react";
import { Column } from "@/types/globals";
import BottomContent from "@/components/globals/datatable/bottomContent";
import ColumnsDropdown from "@/components/globals/datatable/columnsDropdown";
import { pluralize } from "@/utils/formatters";

type Props = {
  url: string;
  model: string;
  columns: Column[];
  initialColumns?: string[];
  records: any[];
  RenderBody: (
    url: string,
    model: string,
    columns: Column[],
    records: any[],
    dependencies: any
  ) => any;
  Buttons?: ReactElement;
  dependencies?: any;
};

const DataTable = ({
  url,
  model,
  columns: ufColumns,
  initialColumns: ufInitialColumns,
  records: ufRecords,
  RenderBody,
  Buttons,
  dependencies,
}: Props) => {
  const initialColumns = ufInitialColumns || [];
  if (initialColumns.length == 0) {
    ufColumns.forEach((ufColumn) => {
      initialColumns.push(ufColumn.name);
    });
  }

  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(initialColumns)
  );
  const columns = useMemo(() => {
    return ufColumns.filter((ufColumn) =>
      Array.from(visibleColumns).includes(ufColumn.name)
    );
  }, [visibleColumns]);

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);

  const [filterValue, setFilterValue] = useState("");
  const [sortDescriptor, setSortDescriptor] = useState<{
    column: string | number;
    direction: "ascending" | "descending";
  }>({
    column: "",
    direction: "ascending",
  });

  const searchFilteredRecords = useMemo(() => {
    const unfiltered = [...ufRecords];

    const filtered = unfiltered.filter((record) => {
      const isValid = columns.some((column) => {
        const value = record.display_format[column.name];
        if (value) {
          return value.toLowerCase().includes(filterValue.toLowerCase());
        }
      });

      if (isValid) return record;
    });

    return filtered;
  }, [filterValue, ufRecords]);

  const records = useMemo(() => {
    const unfiltered = searchFilteredRecords;

    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    const filtered = unfiltered.slice(start, end);
    return filtered;
  }, [page, searchFilteredRecords, rowsPerPage]);

  const sortedRecords = useMemo(() => {
    const unfiltered = records;

    const filtered = [...unfiltered].sort((a, b) => {
      const first = a[sortDescriptor.column!];
      const second = b[sortDescriptor.column!];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });

    return filtered;
  }, [sortDescriptor, records]);

  const pages = Math.ceil(searchFilteredRecords.length / rowsPerPage);

  const onRowsPerPageChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const topContent = useMemo(() => {
    const onSearchChange = (value?: string) => {
      if (value) {
        setFilterValue(value);
        setPage(1);
      } else {
        setFilterValue("");
      }
    };

    const onClear = () => {
      setFilterValue("");
      setPage(1);
    };

    return (
      <>
        <h3 className="text-2xl font-semibold">{pluralize(model)}</h3>

        <div className="flex flex-col gap-4">
          <div className="flex justify-between gap-3 items-end">
            <div className="w-full sm:max-w-[50%]">
              <Input
                isClearable
                placeholder={`Search`}
                startContent={<SearchIcon />}
                value={filterValue}
                onClear={onClear}
                onValueChange={onSearchChange}
              />
            </div>

            <div className="flex justify-end">
              <div className="flex justify-between gap-2">
                {Buttons}

                <ColumnsDropdown
                  columns={ufColumns}
                  visibleColumns={visibleColumns}
                  onSelectionChange={setVisibleColumns}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }, [filterValue, columns, records]);

  return (
    <>
      <div>
        <Card className="m-5 md:my-7 md:mx-32 p-3">
          <CardBody>
            <Table
              aria-label="DataTable"
              isHeaderSticky
              bottomContent={
                <BottomContent
                  total={records.length}
                  page={page}
                  pages={pages}
                  onChange={setPage}
                  onSelectionChange={onRowsPerPageChange}
                />
              }
              bottomContentPlacement="outside"
              classNames={{
                wrapper: "max-h-[40rem]",
              }}
              topContent={topContent}
              topContentPlacement="outside"
              sortDescriptor={sortDescriptor}
              onSortChange={setSortDescriptor}
            >
              <TableHeader columns={columns}>
                {(column) => (
                  <TableColumn
                    key={column.name}
                    allowsSorting={column.sortable}
                  >
                    {column.name.toUpperCase().replace("_", " ")}
                  </TableColumn>
                )}
              </TableHeader>
              <TableBody emptyContent={`No ${pluralize(model)} Found`}>
                {RenderBody(url, model, columns, sortedRecords, dependencies)}
              </TableBody>
            </Table>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default DataTable;
