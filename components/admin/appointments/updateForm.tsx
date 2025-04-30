"use client";

import { appointment as rules } from "@/schemas/admin";
import { Appointment as Values } from "@/types/admin";
import { Property, Appointment as Record } from "@/types/globals";
import { upsert } from "@/utils/actions";
import { onPostSubmit } from "@/utils/events";
import { formatUTC } from "@/utils/formatters";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  CalendarDate,
  DatePicker,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  TimeInput,
  useDisclosure,
} from "@heroui/react";
import { parseDate, parseTime, Time } from "@internationalized/date";
import { ErrorMessage, Field, Form, Formik, FormikProps } from "formik";
import React, { useState } from "react";
import { FaPenToSquare } from "react-icons/fa6";
import * as Yup from "yup";

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
    time: parseTime(record.time).add({ hours: 8 }),
    property_id: record.property_id,
    message: record.message,
  };

  const validationSchema = Yup.object().shape({
    ...rules,
    id: Yup.string().trim().required("ID is required"),
  });

  const onSubmit = async (
    ufValues: Values,
    { resetForm }: { resetForm: () => void },
  ) => {
    setIsSubmitting(true);

    const values = {
      ...ufValues,
      date: ufValues.date!.toString(),
      time: formatUTC(ufValues.time!).toString(),
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
                          <div className="flex w-full flex-col">
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
                              className="text-sm text-red-500"
                            />
                          </div>

                          <div className="flex w-full flex-col">
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
                              className="text-sm text-red-500"
                            />
                          </div>
                        </div>

                        <div className="flex justify-between gap-2">
                          <div className="flex w-full flex-col">
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
                              className="text-sm text-red-500"
                            />
                          </div>

                          <div className="flex w-full flex-col">
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
                              className="text-sm text-red-500"
                            />
                          </div>
                        </div>

                        <div className="flex justify-between gap-3">
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

                          <div className="flex w-full flex-col">
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
                              className="text-sm text-red-500"
                            />
                          </div>
                        </div>

                        <div className="flex w-full flex-col">
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
                            className="text-sm text-red-500"
                          />
                        </div>

                        <div className="flex w-full flex-col">
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
