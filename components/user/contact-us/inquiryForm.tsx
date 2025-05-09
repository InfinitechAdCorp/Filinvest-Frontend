"use client";

import { inquiry as rules } from "@/schemas/admin";
import { Inquiry as Values } from "@/types/admin";
import { Property } from "@/types/globals";
import { get as getCookies } from "@/utils/auth";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
  Textarea,
} from "@heroui/react";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik, FormikProps } from "formik";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";

type Props = {
  properties: Property[];
};

const InquiryForm = ({ properties }: Props) => {
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
    values: Values,
    actions: { resetForm: () => void },
  ) => {
    setIsSubmitting(true);

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/inquiries`, values, {
        headers: {
          Authorization: `Bearer ${apiToken}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      actions.resetForm();
      toast.success("Inquiry Submitted Successfully");
    } catch (error) {
      console.error(error);
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
      // Ensure the value only contains digits
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
