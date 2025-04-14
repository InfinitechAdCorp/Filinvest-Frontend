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
  Select,
  SelectItem,
} from "@heroui/react";
import { Formik, Form, Field, ErrorMessage, FormikProps } from "formik";
import { Inquiry as Values } from "@/types/admin";
import { inquiry as rules } from "@/schemas/admin";
import { upsert } from "@/utils/actions";
import { onPostSubmit } from "@/utils/events";

type Props = {
  url: string;
  model: string;
};

const CreateForm = ({ url, model }: Props) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues = {
    first_name: "",
    last_name: "",
    gender: "",
    landline: "",
    mobile: "",
    email: "",
    city: "",
    country: "Philippines",
    message: "",
    property_id: "",
  };

  const validationSchema = Yup.object().shape({
    ...rules,
  });

  const onSubmit = async (
    values: Values,
    { resetForm }: { resetForm: () => void }
  ) => {
    setIsSubmitting(true);

    const { code, message } = await upsert(url, model, "Create", values);
    onPostSubmit(code, message, resetForm, onClose);

    setIsSubmitting(false);
  };

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        Add {model}
      </Button>

      <Modal size="xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {(props: FormikProps<any>) => (
                  <Form>
                    <ModalHeader>Add {model}</ModalHeader>
                    <ModalBody>
                      <div className="flex flex-col gap-3">
                        <div className="flex justify-between gap-2">
                          <div className="flex flex-col w-full">
                            <Field
                              name="first_name"
                              as={Input}
                              type="text"
                              size="md"
                              variant="bordered"
                              label="First Name"
                              labelPlacement="outside"
                              placeholder="Enter First Name"
                            />
                            <ErrorMessage
                              name="first_name"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>

                          <div className="flex flex-col w-full">
                            <Field
                              name="last_name"
                              as={Input}
                              type="text"
                              size="md"
                              variant="bordered"
                              label="Last Name"
                              labelPlacement="outside"
                              placeholder="Enter Last Name"
                            />
                            <ErrorMessage
                              name="last_name"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>

                          <div className="flex flex-col w-full">
                            <Field
                              name="gender"
                              as={Select}
                              size="md"
                              variant="bordered"
                              label="Gender"
                              labelPlacement="outside"
                              placeholder="Select Gender"
                              defaultSelectedKeys={[props.values.gender]}
                            >
                              <SelectItem key="Male">Male</SelectItem>
                              <SelectItem key="Female">Female</SelectItem>
                            </Field>
                            <ErrorMessage
                              name="last_name"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
                        </div>
                      </div>

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
