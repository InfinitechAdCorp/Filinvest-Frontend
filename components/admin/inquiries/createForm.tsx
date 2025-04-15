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
  Autocomplete,
  AutocompleteItem,
} from "@heroui/react";
import { Formik, Form, Field, ErrorMessage, FormikProps } from "formik";
import { Property } from "@/types/globals";
import { Inquiry as Values } from "@/types/admin";
import { inquiry as rules } from "@/schemas/admin";
import { upsert } from "@/utils/actions";
import { onPostSubmit } from "@/utils/events";

type Props = {
  url: string;
  model: string;
  properties: Property[];
};

const CreateForm = ({ url, model, properties }: Props) => {
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
    await onPostSubmit(url, code, message, resetForm, onClose);

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
                              defaultSelectedKey={props.values.gender}
                            >
                              <SelectItem key="Male">Male</SelectItem>
                              <SelectItem key="Female">Female</SelectItem>
                            </Field>
                            <ErrorMessage
                              name="gender"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
                        </div>

                        <div className="flex justify-between gap-2">
                          <div className="flex flex-col w-full">
                            <Field
                              name="landline"
                              as={Input}
                              type="text"
                              size="md"
                              variant="bordered"
                              label="Landline"
                              labelPlacement="outside"
                              placeholder="Enter Landline"
                            />
                            <ErrorMessage
                              name="landline"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>

                          <div className="flex flex-col w-full">
                            <Field
                              name="mobile"
                              as={Input}
                              type="text"
                              size="md"
                              variant="bordered"
                              label="Mobile"
                              labelPlacement="outside"
                              placeholder="Enter Mobile"
                            />
                            <ErrorMessage
                              name="mobile"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>

                          <div className="flex flex-col w-full">
                            <Field
                              name="email"
                              as={Input}
                              type="text"
                              size="md"
                              variant="bordered"
                              label="Email"
                              labelPlacement="outside"
                              placeholder="Enter Email"
                            />
                            <ErrorMessage
                              name="email"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
                        </div>

                        <div className="flex justify-between gap-2">
                          <div className="flex flex-col w-full">
                            <Field
                              name="city"
                              as={Input}
                              type="text"
                              size="md"
                              variant="bordered"
                              label="City"
                              labelPlacement="outside"
                              placeholder="Enter City"
                            />
                            <ErrorMessage
                              name="city"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>

                          <div className="flex flex-col w-full">
                            <Field
                              name="country"
                              as={Autocomplete}
                              size="md"
                              variant="bordered"
                              label="Country"
                              labelPlacement="outside"
                              placeholder="Select Country"
                              defaultSelectedKey={props.values.country}
                              onSelectionChange={(key: React.Key | null) => {
                                props.setFieldValue("country", key);
                              }}
                            >
                              <AutocompleteItem key="Philippines">
                                Philippines
                              </AutocompleteItem>
                            </Field>
                            <ErrorMessage
                              name="country"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
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

                        <div className="flex flex-col w-full">
                          <Field
                            name="property_id"
                            as={Autocomplete}
                            size="md"
                            variant="bordered"
                            label="Property"
                            labelPlacement="outside"
                            placeholder="Select Property"
                            defaultSelectedKey={props.values.property_id}
                            onSelectionChange={(key: React.Key | null) => {
                              props.setFieldValue("property_id", key);
                            }}
                          >
                            {properties.map((property: Property) => (
                              <AutocompleteItem key={property.id}>
                                {property.name}
                              </AutocompleteItem>
                            ))}
                          </Field>
                          <ErrorMessage
                            name="property_id"
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
