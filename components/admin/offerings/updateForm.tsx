"use client";

import { offering as rules } from "@/schemas/admin";
import { Offering as Values } from "@/types/admin";
import { Offering as Record } from "@/types/globals";
import { upsert } from "@/utils/actions";
import { onPostSubmit } from "@/utils/events";
import {
  Button,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
} from "@heroui/react";
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
  record: Record;
};

const UpdateForm = ({ url, model, record }: Props) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState(
    `${process.env.NEXT_PUBLIC_S3_URL}/properties/offerings/${record.image}`,
  );

  const initialValues = {
    id: record.id,
    property_id: record.property.id,
    type: record.type,
    minimum_area: record.minimum_area,
    maximum_area: record.maximum_area,
    image: "",
  };

  const validationSchema = Yup.object().shape({
    ...rules,
    id: Yup.string().trim().required("ID is required"),
    image: Yup.mixed().nullable(),
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
                        <div className="flex w-full flex-col">
                          <Field
                            name="type"
                            as={Select}
                            size="md"
                            variant="bordered"
                            label="Type"
                            labelPlacement="outside"
                            placeholder="Select Type"
                            defaultSelectedKeys={[props.values.type]}
                          >
                            <SelectItem key="1BR">1BR</SelectItem>
                            <SelectItem key="2BR">2BR</SelectItem>
                            <SelectItem key="Studio">Studio</SelectItem>
                          </Field>
                          <ErrorMessage
                            name="type"
                            component="div"
                            className="text-sm text-red-500"
                          />
                        </div>

                        <div className="flex justify-between gap-2">
                          <div className="flex w-full flex-col">
                            <Field
                              name="minimum_area"
                              as={Input}
                              size="md"
                              variant="bordered"
                              label="Minimum Area"
                              labelPlacement="outside"
                              placeholder="Enter Minimum Area"
                            />
                            <ErrorMessage
                              name="minimum_area"
                              component="div"
                              className="text-sm text-red-500"
                            />
                          </div>

                          <div className="flex w-full flex-col">
                            <Field
                              name="maximum_area"
                              as={Input}
                              size="md"
                              variant="bordered"
                              label="Maximum Area"
                              labelPlacement="outside"
                              placeholder="Enter Maximum Area"
                            />
                            <ErrorMessage
                              name="maximum_area"
                              component="div"
                              className="text-sm text-red-500"
                            />
                          </div>
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
