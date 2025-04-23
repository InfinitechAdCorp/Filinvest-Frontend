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
  Image,
  Select,
  SelectItem,
} from "@heroui/react";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FormikProps,
  FormikErrors,
} from "formik";
import { Property } from "@/types/globals";
import { Offering as Values } from "@/types/admin";
import { offering as rules } from "@/schemas/admin";
import { upsert } from "@/utils/actions";
import { onPostSubmit } from "@/utils/events";

type Props = {
  url: string;
  model: string;
  property: Property;
};

const CreateForm = ({ url, model, property }: Props) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState("");

  const initialValues = {
    property_id: property.id!,
    type: "",
    minimum_area: "",
    maximum_area: "",
    image: "",
  };

  const validationSchema = Yup.object().shape({
    ...rules,
    image: Yup.mixed().required("Image is required"),
  });

  const onSubmit = async (
    values: Values,
    { resetForm }: { resetForm: () => void }
  ) => {
    setIsSubmitting(true);

    const { code, message } = await upsert(url, model, "Create", values);
    await onPostSubmit(url, code, message, resetForm, onClose);

    if (code == 200) {
      setPreview("");
    }

    setIsSubmitting(false);
  };

  const onFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (
      field: string,
      value: File | string
    ) => Promise<void | FormikErrors<any>>
  ) => {
    const files = event.target.files;
    const isValid = files && files[0];
    setPreview(isValid ? URL.createObjectURL(files[0]) : "");
    await setFieldValue("image", isValid ? files[0] : "");
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
                        <div className="flex flex-col w-full">
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
                            className="text-red-500 text-sm"
                          />
                        </div>

                        <div className="flex justify-between gap-2">
                          <div className="flex flex-col w-full">
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
                              className="text-red-500 text-sm"
                            />
                          </div>

                          <div className="flex flex-col w-full">
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
                              className="text-red-500 text-sm"
                            />
                          </div>
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
                          />
                          <ErrorMessage
                            name="image"
                            component="div"
                            className="text-red-500 text-sm"
                          />
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
