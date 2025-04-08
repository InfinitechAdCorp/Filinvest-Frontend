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
import { Create as Values } from "@/types/admin/faqs";
import { create as validationSchema } from "@/schemas/admin/faqs";
import { Formik, Form, Field, FieldProps, ErrorMessage } from "formik";
import axios from "axios";
import toast from "react-hot-toast";

type Props = {
  model: string;
};

const CreateForm = ({ model }: Props) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues = {
    question: "",
    answer: "",
  };

  const onSubmit = async (
    values: Values,
    actions: { resetForm: () => void }
  ) => {
    setIsSubmitting(true);

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/faqs`, values, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      actions.resetForm();
      onClose();
      toast.success(`Created ${model}`);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong!");
    }

    setIsSubmitting(false);
  };

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        Add {model}
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
                    <ModalHeader>Add {model}</ModalHeader>
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
                        Save
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

export default CreateForm;
