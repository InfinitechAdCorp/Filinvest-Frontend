"use client";

import React, { useState } from "react";
import * as Yup from "yup";
import {
  Button,
  Input,
  Textarea,
  Autocomplete,
  AutocompleteItem,
} from "@heroui/react";
import { Formik, FormikProps, Form, Field, ErrorMessage } from "formik";
import { Property } from "@/types/globals";
import { Inquiry as Values } from "@/types/admin";
import { inquiry as rules } from "@/schemas/admin";
import toast from "react-hot-toast";
import axios from "axios";

type Props = {
  properties: Property[];
};

const InquiryForm = ({ properties }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues = {
    first_name: "",
    last_name: "",
    mobile: "",
    email: "",
    property_id: "",
    message: "",
  };

  const validationSchema = Yup.object().shape({
    ...rules,
  });

  const onSubmit = async (
    values: Values,
    actions: { resetForm: () => void }
  ) => {
    setIsSubmitting(true);

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/inquiries`, values, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      actions.resetForm();
      toast.success("Inquiry Submitted Successfully");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something Went Wrong");
    }

    setIsSubmitting(false);
  };

  return (
    <div className="flex max-w-xl">
      <div className="text-left">
        <div className="mb-4">
          <h3 className="text-2xl text-primary">Corporate Headquarters</h3>
          <p>
            Filinvest Building, 79 EDSA, Mandaluyong City, 1550 Philippines, (63
            2) 7-918-8188
          </p>
        </div>

        <div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(props: FormikProps<any>) => (
              <Form>
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between gap-2">
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
      </div>
    </div>
  );
};

export default InquiryForm;
