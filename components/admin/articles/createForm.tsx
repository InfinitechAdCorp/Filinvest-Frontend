"use client";

import React, { ChangeEvent, useState } from "react";
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
  DatePicker,
  CalendarDate,
  Image,
} from "@heroui/react";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FormikProps,
  FormikErrors,
} from "formik";
import { Article as Values } from "@/types/admin";
import { article as rules } from "@/schemas/admin";
import { upsert } from "@/utils/actions";
import { onPostSubmit } from "@/utils/events";

type Props = {
  url: string;
  model: string;
};

const CreateForm = ({ url, model }: Props) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState("");

  const initialValues = {
    name: "",
    type: model,
    date: null,
    description: "",
    image: "",
  };

  const validationSchema = Yup.object().shape({
    ...rules,
    image: Yup.mixed().required("Image is required"),
  });

  const onSubmit = async (
    ufValues: Values,
    { resetForm }: { resetForm: () => void }
  ) => {
    setIsSubmitting(true);

    const values = {
      ...ufValues,
      date: ufValues.date!.toString(),
    };
    const { code, message } = await upsert(url, model, "Create", values);
    await onPostSubmit(url, code, message, resetForm, onClose);

    setIsSubmitting(false);
  };

  const onFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (
      field: string,
      value: File | null
    ) => Promise<void | FormikErrors<any>>
  ) => {
    const files = event.target.files;
    if (files) {
      setPreview(files[0] ? URL.createObjectURL(files[0]) : "");
      await setFieldValue("image", files[0]);
    }
  };

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        Add {model}
      </Button>

      <Modal size="md" isOpen={isOpen} onOpenChange={onOpenChange}>
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
                              name="date"
                              as={DatePicker}
                              size="md"
                              variant="bordered"
                              label="Date"
                              labelPlacement="outside"
                              value={props.values.date}
                              onChange={(value: CalendarDate | null) => {
                                props.setFieldValue("date", value);
                              }}
                            />
                            <ErrorMessage
                              name="date"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
                        </div>

                        <div className="flex flex-col w-full">
                          <Field
                            name="description"
                            as={Textarea}
                            size="md"
                            variant="bordered"
                            label="Description"
                            labelPlacement="outside"
                            placeholder="Enter Description"
                          />
                          <ErrorMessage
                            name="description"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>

                        <div className="flex flex-col w-full">
                          <Field
                            name="image"
                            as={Input}
                            type="file"
                            size="md"
                            variant="bordered"
                            label="Image"
                            labelPlacement="outside"
                            placeholder="Enter Image"
                            value={undefined}
                            onChange={async (
                              e: ChangeEvent<HTMLInputElement>
                            ) => {
                              await onFileChange(e, props.setFieldValue);
                            }}
                          >
                            <ErrorMessage
                              name="image"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </Field>
                        </div>

                        {preview && (
                          <div className="flex justify-center">
                            <Image
                              src={preview}
                              alt="Preview"
                              className="h-32 object-cover rounded-md"
                            />
                          </div>
                        )}
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
