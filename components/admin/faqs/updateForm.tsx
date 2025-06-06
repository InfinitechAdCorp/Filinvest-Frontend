"use client";

import { faq as rules } from "@/schemas/admin";
import { FAQ as Values } from "@/types/admin";
import { FAQ as Record } from "@/types/globals";
import { upsert } from "@/utils/actions";
import { onPostSubmit } from "@/utils/events";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure,
} from "@heroui/react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { FaPenToSquare } from "react-icons/fa6";
import * as Yup from "yup";

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
    id: Yup.string().trim().required("ID is required"),
  });

  const onSubmit = async (
    values: Values,
    { resetForm }: { resetForm: () => void },
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
                enableReinitialize
              >
                {() => (
                  <Form>
                    <ModalHeader>Edit {model}</ModalHeader>
                    <ModalBody>
                      <div className="flex flex-col gap-3">
                        <div className="flex w-full flex-col">
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
                            className="text-sm text-red-500"
                          />
                        </div>

                        <div className="flex w-full flex-col">
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
                            className="text-sm text-red-500"
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
