"use client";

import { destroy as validationSchema } from "@/schemas/admin";
import { Destroy as Values } from "@/types/globals";
import { destroy } from "@/utils/actions";
import { onPostSubmit } from "@/utils/events";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import { Form, Formik } from "formik";
import { useState } from "react";
import { FaTrash } from "react-icons/fa6";

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
    { resetForm }: { resetForm: () => void },
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
        isIconOnly
        title="Delete"
        onPress={onOpen}
        startContent={<FaTrash size={14} color="white" />}
      ></Button>

      <Modal size="md" isOpen={isOpen} onOpenChange={onOpenChange}>
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
                      <h3 className="text-sm">
                        Are you sure that you want to delete this {model}?
                      </h3>
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
