"use client";

import React from "react";
import {
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@heroui/react";
import { Article } from "@/types/globals";
import { formatDate } from "@/utils/formatters";

type Props = {
  selected: Article | null;
  isOpen: boolean;
  onClose: () => void;
};

const ArticleModal = ({ selected, isOpen, onClose }: Props) => {
  return (
    <Modal size="3xl" isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col">
              <h3 className="text-2xl font-bold text-primary">
                {selected?.name}
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
                    src={`${process.env.NEXT_PUBLIC_S3_URL}/articles/${selected?.image}`}
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
  );
};

export default ArticleModal;
