"use client";

import { article as rules } from "@/schemas/admin";
import { Article as Values } from "@/types/admin";
import { Article } from "@/types/globals";
import { upsert } from "@/utils/actions";
import { onPostSubmit } from "@/utils/events";
import {
  Button,
  CalendarDate,
  DatePicker,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure,
} from "@heroui/react";
import { parseDate } from "@internationalized/date";
import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  FormikErrors,
  FormikProps,
} from "formik";
import React, { ChangeEvent, useState } from "react";
import { FaPenToSquare } from "react-icons/fa6";
import * as Yup from "yup";

type Props = {
  url: string;
  model: string;
  record: Article;
};

const UpdateForm = ({ url, model, record }: Props) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState(
    `${process.env.NEXT_PUBLIC_S3_URL}/articles/${record.image}`,
  );

  const initialValues = {
    id: record.id,
    name: record.name,
    type: model,
    date: parseDate(record.date),
    description: record.description,
    image: "",
  };

  const validationSchema = Yup.object().shape({
    ...rules,
    id: Yup.string().trim().required("ID is required"),
    image: Yup.mixed().nullable(),
  });

  const onSubmit = async (
    ufValues: Values,
    { resetForm }: { resetForm: () => void },
  ) => {
    setIsSubmitting(true);

    const values = {
      ...ufValues,
      date: ufValues.date!.toString(),
      image: ufValues.image ? ufValues.image : null,
    };

    const { code, message } = await upsert(url, model, "Update", values);
    await onPostSubmit(url, code, message, resetForm, onClose);

    setIsSubmitting(false);
  };

  const onFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (
      field: string,
      value: File | string,
    ) => Promise<void | FormikErrors<any>>,
  ) => {
    const files = event.target.files;
    const isValid = files && files[0];
    setPreview(isValid ? URL.createObjectURL(files[0]) : "");
    await setFieldValue("image", isValid ? files[0] : "");
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
                    <ModalHeader>Edit {model}</ModalHeader>
                    <ModalBody>
                      <div className="flex flex-col gap-3">
                        <div className="flex justify-between gap-2">
                          <div className="flex w-full flex-col">
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
                              className="text-sm text-red-500"
                            />
                          </div>

                          <div className="flex w-full flex-col">
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
                              className="text-sm text-red-500"
                            />
                          </div>
                        </div>

                        <div className="flex w-full flex-col">
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
                            className="text-sm text-red-500"
                          />
                        </div>

                        <div className="flex w-full flex-col">
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
                              e: ChangeEvent<HTMLInputElement>,
                            ) => {
                              await onFileChange(e, props.setFieldValue);
                            }}
                          />
                          <ErrorMessage
                            name="image"
                            component="div"
                            className="text-sm text-red-500"
                          />
                        </div>

                        {preview && (
                          <div className="flex justify-center">
                            <Image
                              src={preview}
                              alt="Preview"
                              className="h-32 rounded-md object-cover"
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
