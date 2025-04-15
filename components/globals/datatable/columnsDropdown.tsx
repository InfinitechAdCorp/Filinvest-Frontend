"use client";

import React from "react";
import { Column } from "@/types/globals";
import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Selection,
} from "@heroui/react";
import { formatReadable } from "@/utils/formatters";

type Props = {
  columns: Column[];
  visibleColumns: Selection;
  onSelectionChange: React.Dispatch<React.SetStateAction<Selection>>;
};

const ColumnsDropdown = ({
  columns,
  visibleColumns,
  onSelectionChange,
}: Props) => {
  return (
    <Dropdown>
      <DropdownTrigger className="hidden sm:flex">
        <Button color="primary">Columns</Button>
      </DropdownTrigger>
      <DropdownMenu
        disallowEmptySelection
        aria-label="Table Columns"
        closeOnSelect={false}
        selectedKeys={visibleColumns}
        selectionMode="multiple"
        onSelectionChange={onSelectionChange}
      >
        {columns.map((column) => (
          <DropdownItem key={column.name}>
            {formatReadable(column.name)}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default ColumnsDropdown;
