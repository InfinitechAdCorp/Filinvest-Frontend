"use client";

import React, { useState } from "react";
import { Button, Link } from "@heroui/react";
import { FaEye } from "react-icons/fa";

type Props = {
  title: string;
  url: string;
};

const ViewBtn = ({ title, url }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Button
        as={Link}
        size="sm"
        color="primary"
        isIconOnly={true}
        title={title}
        href={url}
      >
        <FaEye size={14} />
      </Button>
    </>
  );
};

export default ViewBtn;
