"use client";

import React, { useState } from "react";
import * as Yup from "yup";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Textarea,
} from "@heroui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Testimonial as Record } from "@/types/globals";
import { Testimonial as Values } from "@/types/admin";
import { testimonial as rules } from "@/schemas/admin";
import { upsert } from "@/utils/actions";
import { onPostSubmit } from "@/utils/events";
import { FaPenToSquare } from "react-icons/fa6";

type Props = {
  url: string;
  model: string;
  record: Record;
};

const UpdateForm = ({ url, model, record }: Props) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues = {
    id: record.id,
    name: record.name,
    message: record.message,
  };

  const validationSchema = Yup.object().shape({
    ...rules,
    id: Yup.string().trim().required(),
  });

  const onSubmit = async (
    values: Values,
    { resetForm }: { resetForm: () => void }
  ) => {
    setIsSubmitting(true);

    const { code, message } = await upsert(url, model, "Update", values);
    await onPostSubmit(url, code, message, resetForm, onClose);

    setIsSubmitting(false);
  };

  return (
    <>
      <Button
        size="sm"
        color="primary"
        isIconOnly={true}
        title="Edit"
        onPress={onOpen}
      >
        <FaPenToSquare size={14} />
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
                    <ModalHeader>Edit {model}</ModalHeader>
                    <ModalBody>
                      <div className="flex flex-col space-y-2">
                        <div className="flex flex-col w-full">
                          <Field
                            name="name"
                            as={Input}
                            type="text"
                            size="md"
                            variant="bordered"
                            label="Name"
                            labelPlacement="outside"
                            placeholder="Enter Name"
                          />
                          <ErrorMessage
                            name="name"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>

                        <div className="flex flex-col w-full">
                          <Field
                            name="message"
                            as={Textarea}
                            size="md"
                            variant="bordered"
                            label="Message"
                            labelPlacement="outside"
                            placeholder="Enter Message"
                          />
                          <ErrorMessage
                            name="message"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        color="primary"
                        type="submit"
                        isLoading={isSubmitting}
                      >
                        Update
                      </Button>
                      <Button color="danger" onPress={onClose}>
                        Cancel
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

export default UpdateForm;
