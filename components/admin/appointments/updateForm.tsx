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
  Autocomplete,
  AutocompleteItem,
  CalendarDate,
  DatePicker,
  TimeInput,
} from "@heroui/react";
import { Formik, Form, Field, ErrorMessage, FormikProps } from "formik";
import { Property } from "@/types/globals";
import { Appointment as Record } from "@/types/globals";
import { Appointment as Values } from "@/types/admin";
import { appointment as rules } from "@/schemas/admin";
import { upsert } from "@/utils/actions";
import { onPostSubmit } from "@/utils/events";
import { parseDate, parseTime, Time } from "@internationalized/date";
import { FaPenToSquare } from "react-icons/fa6";

type Props = {
  url: string;
  model: string;
  record: Record;
  properties: Property[];
};

const UpdateForm = ({ url, model, record, properties }: Props) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues = {
    id: record.id,
    first_name: record.first_name,
    last_name: record.last_name,
    mobile: record.mobile,
    email: record.email,
    date: parseDate(record.date),
    time: parseTime(record.time),
    property_id: record.property_id,
    message: record.message,
  };

  const validationSchema = Yup.object().shape({
    ...rules,
    id: Yup.string().trim().required("ID is a required field"),
  });

  const onSubmit = async (
    ufValues: Values,
    { resetForm }: { resetForm: () => void }
  ) => {
    setIsSubmitting(true);

    const values = {
      ...ufValues,
      date: ufValues.date!.toString(),
      time: ufValues.time!.toString(),
    };
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
                    <ModalHeader>Edit {model}</ModalHeader>
                    <ModalBody>
                      <div className="flex flex-col gap-3">
                        <div className="flex justify-between gap-3">
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
                        </div>

                        <div className="flex justify-between gap-2">
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

                        <div className="flex justify-between gap-3">
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

                          <div className="flex flex-col w-full">
                            <Field
                              name="time"
                              as={TimeInput}
                              size="md"
                              variant="bordered"
                              label="Time"
                              labelPlacement="outside"
                              onChange={(value: Time | null) => {
                                props.setFieldValue("time", value);
                              }}
                            />
                            <ErrorMessage
                              name="time"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
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
