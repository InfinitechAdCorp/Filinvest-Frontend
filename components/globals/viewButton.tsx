"use client";

import React from "react";
import { Button, Link } from "@heroui/react";
import { FaEye } from "react-icons/fa";

type Props = {
  title: string;
  url: string;
};

const ViewButton = ({ title, url }: Props) => {
  return (
    <>
      <Button
        as={Link}
        size="sm"
        color="primary"
        isIconOnly
        title={title}
        href={url}
      >
        <FaEye size={14} />
      </Button>
    </>
  );
};

export default ViewButton;
