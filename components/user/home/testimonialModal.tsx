"use client";

import React from "react";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/react";
import { Testimonial } from "@/types/globals";

type Props = {
  selected: Testimonial | null;
  isOpen: boolean;
  onClose: () => void;
};

const TestimonialModal = ({ selected, isOpen, onClose }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {selected?.name}
            </ModalHeader>
            <ModalBody>
              <div className="max-h-[15rem] overflow-y-scroll">
                <p className="text-gray-600">{selected?.message}</p>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default TestimonialModal;
