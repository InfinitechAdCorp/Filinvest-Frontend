"use client";

import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { Formik, Form } from "formik";
import { destroy as validationSchema } from "@/schemas/admin";
import { Destroy as Values } from "@/types/globals";
import { FaTrash } from "react-icons/fa6";
import { onPostSubmit } from "@/utils/events";
import { destroy } from "@/utils/actions";

type Props = {
  url: string;
  model: string;
  id: string;
};

const DestroyForm = ({ url, model, id }: Props) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues = {
    id: id,
  };

  const onSubmit = async (
    values: Values,
    { resetForm }: { resetForm: () => void }
  ) => {
    setIsSubmitting(true);

    const { code, message } = await destroy(url, model, values);
    await onPostSubmit(url, code, message, resetForm, onClose);

    setIsSubmitting(false);
  };

  return (
    <>
      <Button
        size="sm"
        color="danger"
        isIconOnly={true}
        title="Delete"
        onPress={onOpen}
      >
        <FaTrash />
      </Button>

      <Modal size="sm" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {() => (
                  <Form>
                    <ModalHeader>Delete {model}</ModalHeader>
                    <ModalBody>
                      <h6>
                        Are you sure that you want to delete this {model}?
                      </h6>
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        color="primary"
                        type="submit"
                        isLoading={isSubmitting}
                      >
                        Yes
                      </Button>
                      <Button color="danger" onPress={onClose}>
                        No
                      </Button>
                    </ModalFooter>
                  </Form>
                )}
              </Formik>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default DestroyForm;
