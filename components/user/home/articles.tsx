"use client";

import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import { Article } from "@/types/globals";
import { formatDate } from "@/utils/formatters";

type Props = {
  articles: Article[];
};

const Articles = ({ articles }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selected, setSelected] = useState<Article | null>(null);

  return (
    <>
      <div className="flex flex-wrap md:flex-nowrap justify-between items-start gap-8 mt-2">
        <div className="p-2 flex flex-wrap gap-4 justify-center mx-60 w-full">
          {articles.length > 0 ? (
            <>
              {articles.map((article) => (
                <Card
                  key={article.id}
                  className="py-2 w-[20rem]"
                  isPressable
                  onPress={() => {
                    setSelected(article);
                    onOpen();
                  }}
                >
                  <CardHeader className="pb-0">
                    <Image
                      alt="News"
                      className="object-cover h-[11rem] w-full rounded-xl"
                      src={`${process.env.NEXT_PUBLIC_S3_URL}/articles/${article.image}`}
                    />
                  </CardHeader>
                  <CardBody className="overflow-visible py-2">
                    <h3 className="font-bold text-large text-primary">
                      {article.name}
                    </h3>
                    <h3 className="text-sm font-semibold text-primary">
                      {formatDate(article.date)}
                    </h3>

                    <p className="text-default-500 line-clamp-3 my-3">
                      {article.description}
                    </p>
                  </CardBody>
                </Card>
              ))}
            </>
          ) : (
            <div className="flex justify-center">
              <h3 className="font-semibold">No Articles Found</h3>
            </div>
          )}
        </div>
      </div>

      <Modal
        size="3xl"
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior="inside"
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col">
                <h3 className="text-2xl font-bold text-primary">
                  {selected!.name}
                </h3>
                <p className="text-sm text-primary">
                  {selected?.date ? formatDate(selected.date) : ""}
                </p>
              </ModalHeader>

              <ModalBody className="p-5">
                <div className="flex flex-col gap-4">
                  {selected?.image ? (
                    <Image
                      isBlurred
                      alt="Article"
                      className="w-full h-[25rem] object-cover rounded-xl"
                      src={`${process.env.NEXT_PUBLIC_S3_URL}/articles/${selected.image}`}
                    />
                  ) : (
                    <p>No media available</p>
                  )}

                  <div className="max-w-none">
                    <p className="text-gray-700 leading-relaxed">
                      {selected?.description}
                    </p>
                  </div>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Articles;
