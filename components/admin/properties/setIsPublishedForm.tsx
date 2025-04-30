"use client";

import { Property as Record } from "@/types/globals";
import { get as getCookies } from "@/utils/auth";
import { onPostSubmit } from "@/utils/events";
import { Button, Spinner } from "@heroui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa6";

type Props = {
  url: string;
  model: string;
  record: Record;
};

const SetIsPublishedForm = ({ url, model, record }: Props) => {
  const [apiToken, setApiToken] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getApiToken = async () => {
      const { record: cookies } = await getCookies();
      if (cookies.apiToken) setApiToken(cookies.apiToken);
    };
    getApiToken();
  }, []);

  const setIsPublished = async (
    url: string,
    model: string,
    values: { id: string; isPublished: number },
  ) => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/${url}/set-is-published`,
        values,
        {
          headers: {
            Authorization: `Bearer ${apiToken}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      );
      return { code: 200, message: `Updated Published Status of ${model}` };
    } catch (error) {
      console.error(error);
      return { code: 500, message: "Something Went Wrong", error: error };
    }
  };

  const onPress = async (record: Record) => {
    setIsSubmitting(true);

    const values = {
      id: record.id,
      isPublished: record.isPublished == 0 ? 1 : 0,
    };

    const { code, message } = await setIsPublished(url, model, values);
    await onPostSubmit(url, code, message);

    setIsSubmitting(false);
  };

  const getStartContent = (isPublished: number) => {
    let content;
    if (isSubmitting) {
      content = <Spinner size="sm" color="white" />;
    } else {
      if (isPublished == 0) {
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
      title={`${record.isPublished == 0 ? "Publish" : "Unpublish"}`}
      onPress={() => onPress(record)}
      startContent={getStartContent(record.isPublished)}
    />
  );
};

export default SetIsPublishedForm;
