"use client";

import { Pagination } from "@heroui/react";
import React, { ChangeEvent } from "react";

type Props = {
  total: number;
  page: number;
  pages: number;
  onChange: React.Dispatch<React.SetStateAction<number>>;
  onSelectionChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

const BottomContent = ({
  total,
  page,
  pages,
  onChange,
  onSelectionChange,
}: Props) => {
  return (
    <div className="flex items-center justify-between px-2">
      <span className="w-[30%] text-small text-default-400">
        Total: {total}
      </span>
      <Pagination
        isCompact
        showControls
        showShadow
        color="primary"
        page={page}
        total={pages}
        onChange={onChange}
      />
      <label className="flex w-[30%] items-center justify-end gap-1 text-small text-default-400">
        Rows:
        <select
          className="bg-transparent text-small text-default-400 outline-none"
          onChange={onSelectionChange}
        >
          <option>5</option>
          <option>10</option>
          <option>15</option>
        </select>
      </label>
    </div>
  );
};

export default BottomContent;
