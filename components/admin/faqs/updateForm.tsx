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
import { FaPenToSquare } from "react-icons/fa6";
import { FAQ as Record } from "@/types/globals";
import { FAQ as Values } from "@/types/admin";
import { faq as rules } from "@/schemas/admin";
import { upsert } from "@/utils/actions";
import { onPostSubmit } from "@/utils/events";

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
    question: record.question,
    answer: record.answer,
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
        isIconOnly
        title="Edit"
        onPress={onOpen}
        startContent={<FaPenToSquare size={14} color="white" />}
      ></Button>

      <Modal size="sm" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                enableReinitialize={true}
              >
                {() => (
                  <Form>
                    <ModalHeader>Edit {model}</ModalHeader>
                    <ModalBody>
                      <div className="flex flex-col gap-3">
                        <div className="flex flex-col w-full">
                          <Field
                            name="question"
                            as={Input}
                            type="text"
                            size="md"
                            variant="bordered"
                            label="Question"
                            labelPlacement="outside"
                            placeholder="Enter Question"
                          />
                          <ErrorMessage
                            name="question"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>

                        <div className="flex flex-col w-full">
                          <Field
                            name="answer"
                            as={Textarea}
                            size="md"
                            variant="bordered"
                            label="Answer"
                            labelPlacement="outside"
                            placeholder="Enter Answer"
                          />
                          <ErrorMessage
                            name="answer"
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
