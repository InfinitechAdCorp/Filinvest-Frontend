"use client";

import React, { useState } from "react";
import {
  Button,
  Input,
  Select,
  SelectItem,
  Textarea,
  Autocomplete,
  AutocompleteItem,
  DatePicker,
  TimeInput,
} from "@heroui/react";
import { Property, CreateAppointment as Values } from "@/types/user";
import { CreateAppointment as validationSchema } from "@/schemas/user";
import { Formik, FormikProps, Form, Field, FieldProps } from "formik";
import toast from "react-hot-toast";
import axios from "axios";
import { dateToDateValue, dateValueToDate } from "@/utils/formatters";

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
    date: "",
    time: "",
    property_id: "",
    message: "",
  };

  const onSubmit = async (
    values: Values,
    actions: { resetForm: () => void }
  ) => {
    console.log(values);
    // setIsSubmitting(true);

    // try {
    //   await axios.post(
    //     `${process.env.NEXT_PUBLIC_API_URL}/appointments`,
    //     values,
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   );

    //   actions.resetForm();
    //   toast.success("Appointment submitted successfully!");
    // } catch (error) {
    //   console.error("Error:", error);
    //   toast.error("Something went wrong!");
    // }

    // setIsSubmitting(false);
  };

  return (
    <div className="flex">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(props: FormikProps<any>) => (
          <Form className="space-y-3">
            <div className="space-y-3">
              <div className="mb-3">
                <h3 className="text-xl text-primary">Personal Information</h3>
              </div>

              <div className="flex justify-between gap-2">
                <div className="flex flex-col w-full">
                  <Field name="first_name">
                    {({ field, meta }: FieldProps) => (
                      <div>
                        <Input {...field} radius="none" label="First Name" />

                        {meta.touched && meta.error && (
                          <small className="text-red-500">{meta.error}</small>
                        )}
                      </div>
                    )}
                  </Field>
                </div>

                <div className="flex flex-col w-full">
                  <Field name="last_name">
                    {({ field, meta }: FieldProps) => (
                      <div>
                        <Input {...field} radius="none" label="Last Name" />

                        {meta.touched && meta.error && (
                          <small className="text-red-500">{meta.error}</small>
                        )}
                      </div>
                    )}
                  </Field>
                </div>
              </div>

              <div className="flex justify-between gap-2">
                <div className="flex flex-col w-full">
                  <Field name="mobile">
                    {({ field, meta }: FieldProps) => (
                      <div>
                        <Input {...field} radius="none" label="Mobile" />

                        {meta.touched && meta.error && (
                          <small className="text-red-500">{meta.error}</small>
                        )}
                      </div>
                    )}
                  </Field>
                </div>

                <div className="flex flex-col w-full">
                  <Field name="email">
                    {({ field, meta }: FieldProps) => (
                      <div>
                        <Input
                          {...field}
                          type="email"
                          radius="none"
                          label="Email"
                        />

                        {meta.touched && meta.error && (
                          <small className="text-red-500">{meta.error}</small>
                        )}
                      </div>
                    )}
                  </Field>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="mb-3">
                <h3 className="text-xl text-primary">Appointment Details</h3>
              </div>

              <div className="flex justify-between gap-2">
                <div className="flex flex-col w-full">
                  <Field name="date">
                    {({ field, meta }: FieldProps) => (
                      <div>
                        <DatePicker
                          {...field}
                          radius="none"
                          label="Date"
                          value={dateToDateValue(field.value)}
                          onChange={(value) => {
                            const date = dateValueToDate(value);
                            props.setFieldValue(field.name, date);
                          }}
                        />
                        {meta.touched && meta.error && (
                          <small className="text-red-500">{meta.error}</small>
                        )}
                      </div>
                    )}
                  </Field>
                </div>

                <div className="flex flex-col w-full">
                  <Field name="time">
                    {({ field, meta }: FieldProps) => (
                      <div>
                        <TimeInput {...field} radius="none" label="Time" onChange={(value) => {
                            console.log(value)
                        }} />

                        {meta.touched && meta.error && (
                          <small className="text-red-500">{meta.error}</small>
                        )}
                      </div>
                    )}
                  </Field>
                </div>
              </div>

              <div className="flex flex-col">
                <Field name="property_id">
                  {({ field, meta }: FieldProps) => (
                    <div>
                      <Autocomplete
                        {...field}
                        radius="none"
                        label="Property"
                        onInputChange={(value: string) => {
                          props.setFieldValue(field.name, value);
                        }}
                        onSelectionChange={(key: React.Key | null) => {
                          props.setFieldValue(field.name, key);
                        }}
                        defaultSelectedKey={field.value}
                      >
                        {properties.map((property) => (
                          <AutocompleteItem key={property.id}>
                            {property.name}
                          </AutocompleteItem>
                        ))}
                      </Autocomplete>

                      {meta.touched && meta.error && (
                        <small className="text-red-500">{meta.error}</small>
                      )}
                    </div>
                  )}
                </Field>
              </div>

              <div className="flex flex-col w-full">
                <Field name="message">
                  {({ field, meta }: FieldProps) => (
                    <div>
                      <Textarea {...field} radius="none" label="Message" />

                      {meta.touched && meta.error && (
                        <small className="text-red-500">{meta.error}</small>
                      )}
                    </div>
                  )}
                </Field>
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
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AppointmentForm;
