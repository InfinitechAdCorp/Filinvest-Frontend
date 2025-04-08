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
  Input,
  Textarea,
} from "@heroui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FAQ } from "@/types/globals";
import { FaPenToSquare } from "react-icons/fa6";
import { FAQ as Values } from "@/types/admin";
import { update as validationSchema } from "@/schemas/admin/faqs";
import { upsert } from "@/utils/actions";
import toast from "react-hot-toast";

type Props = {
  model: string;
  record: FAQ;
};

const UpdateForm = ({ model, record }: Props) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues = {
    id: record.id,
    question: record.question,
    answer: record.answer,
  };

  const onSubmit = async (
    values: Values,
    actions: { resetForm: () => void }
  ) => {
    setIsSubmitting(true);

    const { code, message } = await upsert(model, "faqs", "Update", values);

    if (code == 200) {
      actions.resetForm();
      onClose();
      toast.success(message);
    } else {
      toast.error(message);
    }

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
                enableReinitialize={true}
              >
                {() => (
                  <Form>
                    <ModalHeader>Edit {model}</ModalHeader>
                    <ModalBody>
                      <div className="flex flex-col space-y-2">
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
