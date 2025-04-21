"use client";

import React, { useState } from "react";
import * as Yup from "yup";
import {
  Button,
  Input,
  Textarea,
  Autocomplete,
  AutocompleteItem,
  DatePicker,
  TimeInput,
  CalendarDate,
} from "@heroui/react";
import { Property } from "@/types/globals";
import { Appointment as Values } from "@/types/admin";
import { appointment as rules } from "@/schemas/admin";
import { Formik, FormikProps, Form, Field, ErrorMessage } from "formik";
import toast from "react-hot-toast";
import axios from "axios";
import { Time } from "@internationalized/date";
import { formatUTC } from "@/utils/formatters";

type Props = {
  properties: Property[];
};

const AppointmentForm = ({ properties }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues = {
    first_name: "",
    last_name: "",
    mobile: "",
    email: "",
    date: null,
    time: null,
    property_id: "",
    message: "",
  };

  const validationSchema = Yup.object().shape({
    ...rules,
  });

  const onSubmit = async (
    ufValues: Values,
    actions: { resetForm: () => void }
  ) => {
    setIsSubmitting(true);

    const values = {
      ...ufValues,
      date: ufValues.date!.toString(),
      time: formatUTC(ufValues.time!).toString(),
    };

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/appointments`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      actions.resetForm();
      toast.success("Appointment submitted successfully!");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong!");
    }

    setIsSubmitting(false);
  };

  return (
    <div className="flex">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(props: FormikProps<any>) => (
          <Form>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-3">
                <div>
                  <h3 className="text-xl text-primary">Personal Information</h3>
                </div>

                <div className="flex justify-between gap-3">
                  <div className="flex flex-col w-full">
                    <Field
                      name="first_name"
                      as={Input}
                      type="text"
                      radius="none"
                      label="First Name"
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
                      radius="none"
                      label="Last Name"
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
                      radius="none"
                      label="Mobile"
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
                      radius="none"
                      label="Email"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div>
                  <h3 className="text-xl text-primary">Appointment Details</h3>
                </div>

                <div className="flex justify-between gap-3">
                  <div className="flex flex-col w-full">
                    <Field
                      name="date"
                      as={DatePicker}
                      radius="none"
                      label="Date"
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
                      radius="none"
                      label="Time"
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
                    radius="none"
                    label="Property"
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
                    radius="none"
                    label="Message"
                  />
                  <ErrorMessage
                    name="message"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>

              <div>
                <Button
                  className="w-full"
                  color="primary"
                  type="submit"
                  isLoading={isSubmitting}
                >
                  Submit
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AppointmentForm;
