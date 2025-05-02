"use client";

import BottomContent from "@/components/globals/datatable/bottomContent";
import ColumnsDropdown from "@/components/globals/datatable/columnsDropdown";
import { Column } from "@/types/globals";
import { formatReadable, pluralize } from "@/utils/formatters";
import {
  Card,
  CardBody,
  Input,
  Selection,
  Table,
  TableBody,
  TableColumn,
  TableHeader,
} from "@heroui/react";
import {
  ChangeEvent,
  ReactElement,
  useCallback,
  useMemo,
  useState,
} from "react";
import { SearchIcon } from "../icons";

type Props = {
  url: string;
  model: string;
  prefix?: string;
  columns: Column[];
  initialColumns?: string[];
  records: any[];
  RenderBody: (
    url: string,
    model: string,
    columns: Column[],
    records: any[],
    dependencies: any,
  ) => any;
  Buttons?: ReactElement;
  dependencies?: any;
};

const DataTable = ({
  url,
  model,
  prefix,
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
    new Set(initialColumns),
  );
  const columns = useMemo(() => {
    return ufColumns.filter((ufColumn) =>
      Array.from(visibleColumns).includes(ufColumn.name),
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
    [],
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
        <h3 className="text-2xl font-semibold">{`${prefix ? prefix : ""} ${pluralize(model)}`}</h3>

        <div className="flex flex-col gap-4">
          <div className="flex items-end justify-between gap-3">
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
        <Card className="m-5 p-3 md:mx-28 md:my-12">
          <CardBody>
            <Table
              aria-label="DataTable"
              isHeaderSticky
              classNames={{ wrapper: "max-h-[40rem]" }}
              topContent={topContent}
              topContentPlacement="outside"
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
              sortDescriptor={sortDescriptor}
              onSortChange={setSortDescriptor}
            >
              <TableHeader columns={columns}>
                {(column) => (
                  <TableColumn
                    key={column.name}
                    allowsSorting={column.sortable}
                  >
                    {formatReadable(column.name)}
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
