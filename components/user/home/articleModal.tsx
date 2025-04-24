"use client";

import React from "react";
import {
  Image,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import { Article } from "@/types/globals";
import { formatDate } from "@/utils/formatters";

type Props = {
  article: Article;
};

const ArticleModal = ({ article }: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div className="text-center">
        <h3
          className="text-primary font-semibold cursor-pointer"
          onClick={onOpen}
        >
          Read More
        </h3>
      </div>

      <Modal
        size="3xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col">
                <h3 className="text-2xl font-bold text-primary">
                  {article.name}
                </h3>
                <p className="text-sm text-primary">
                  {formatDate(article.date)}
                </p>
              </ModalHeader>

              <ModalBody className="p-5">
                <div className="flex flex-col gap-4">
                  {article.image ? (
                    <Image
                      isBlurred
                      alt="Article"
                      className="w-full h-[25rem] object-cover rounded-xl"
                      src={`${process.env.NEXT_PUBLIC_S3_URL}/articles/${article.image}`}
                    />
                  ) : (
                    <p>No media available</p>
                  )}

                  <div className="max-w-none">
                    <p className="text-gray-700 leading-relaxed">
                      {article.description}
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

export default ArticleModal;
