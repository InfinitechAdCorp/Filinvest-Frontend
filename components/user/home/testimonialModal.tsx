"use client";

import { Testimonial } from "@/types/globals";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/react";

type Props = {
  selected: Testimonial | null;
  isOpen: boolean;
  onClose: () => void;
};

const TestimonialModal = ({ selected, isOpen, onClose }: Props) => {
  return (
    <Modal size="3xl" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {selected?.name}
            </ModalHeader>
            <ModalBody>
              <div className="max-h-[15rem] overflow-y-scroll">
                {selected?.message
                  .split("\n")
                  .map((string, index) => (
                    <div key={index}>
                      {string == "" ? (
                        <br />
                      ) : (
                        <p className="text-gray-600">{string}</p>
                      )}
                    </div>
                  ))}
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default TestimonialModal;
