"use client";

import React, { useState } from "react";
import { Property as Record } from "@/types/globals";
import { Button, Spinner } from "@heroui/react";
import { FaStar, FaRegStar } from "react-icons/fa6";
import axios from "axios";
import { onPostSubmit } from "@/utils/events";

type Props = {
  url: string;
  model: string;
  record: Record;
};

const SetIsFeaturedForm = ({ url, model, record }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setIsFeatured = async (
    url: string,
    model: string,
    values: { id: string; isFeatured: number }
  ) => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/${url}/set-is-featured`,
        values,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      return { code: 200, message: `Updated Featured Status of ${model}` };
    } catch (error) {
      console.error(error);
      return { code: 500, message: "Something Went Wrong", error: error };
    }
  };

  const onPress = async (record: Record) => {
    setIsSubmitting(true);

    const values = {
      id: record.id,
      isFeatured: record.isFeatured == 0 ? 1 : 0,
    };

    const { code, message } = await setIsFeatured(url, model, values);
    await onPostSubmit(url, code, message);

    setIsSubmitting(false);
  };

  const getStartContent = (isFeatured: number) => {
    let content;
    if (isSubmitting) {
      content = <Spinner size="sm" color="white" />;
    } else {
      if (isFeatured == 0) {
        content = <FaRegStar size={14} color="white" />;
      } else {
        content = <FaStar size={14} color="white" />;
      }
    }
    return content;
  };

  return (
    <Button
      size="sm"
      color="warning"
      isIconOnly
      title={`${record.isFeatured == 0 ? "Feature" : "Unfeature"}`}
      isDisabled={record.isPublished == 0}
      onPress={() => onPress(record)}
      startContent={getStartContent(record.isFeatured)}
    />
  );
};

export default SetIsFeaturedForm;
