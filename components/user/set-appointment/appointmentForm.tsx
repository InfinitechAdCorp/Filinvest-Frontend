"use client";

import { appointment as rules } from "@/schemas/admin";
import { Appointment as Values } from "@/types/admin";
import { Property } from "@/types/globals";
import { get as getCookies } from "@/utils/auth";
import { formatUTC } from "@/utils/formatters";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  CalendarDate,
  DatePicker,
  Input,
  Textarea,
  TimeInput,
} from "@heroui/react";
import { Time } from "@internationalized/date";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik, FormikProps } from "formik";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";

type Props = {
  properties: Property[];
};

const AppointmentForm = ({ properties }: Props) => {
  const [apiToken, setApiToken] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getApiToken = async () => {
      const { record: cookies } = await getCookies();
      if (cookies.apiToken) setApiToken(cookies.apiToken);
    };
    getApiToken();
  }, []);

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
    mobile: Yup.string()
        .matches(/^09\d{9}$/, "Phone number must start with 09")
        .required("Mobile number is required"),
  });

  const onSubmit = async (
    ufValues: Values,
    actions: { resetForm: () => void },
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
            Authorization: `Bearer ${apiToken}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      );
      actions.resetForm();
      toast.success("Appointment Submitted Successfully");
    } catch (error) {
      console.error(error);
      toast.error("Something Went Wrong");
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
                <div className="flex justify-between gap-3">
                  <div className="flex w-full flex-col">
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
                      className="text-sm text-red-500"
                    />
                  </div>

                  <div className="flex w-full flex-col">
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
    radius="none"
    label="Mobile"
    maxLength={11}  // Limit the max length to 11 digits
    onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
      // Ensure only digits are allowed
      e.target.value = e.target.value.replace(/[^0-9]/g, "");
    }}
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
                      radius="none"
                      label="Email"
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
                      className="text-sm text-red-500"
                    />
                  </div>

                  <div className="flex w-full flex-col">
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
                      className="text-sm text-red-500"
                    />
                  </div>
                </div>

                <div className="flex w-full flex-col">
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
                    className="text-sm text-red-500"
                  />
                </div>

                <div className="flex w-full flex-col">
                  <Field
                    name="message"
                    as={Textarea}
                    radius="none"
                    label="Message"
                  />
                  <ErrorMessage
                    name="message"
                    component="div"
                    className="text-sm text-red-500"
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
