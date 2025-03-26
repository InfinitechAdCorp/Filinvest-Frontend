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
} from "@heroui/react";
import { Property, SubmitInquiry as Values } from "@/types/user";
import { SubmitInquiry as validationSchema } from "@/schemas/user";
import { Formik, FormikProps, Form, Field, FieldProps } from "formik";
import toast from "react-hot-toast";
import axios from "axios";

type Props = {
  properties: Property[];
};

const InquiryForm = ({ properties }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues = {
    first_name: "0",
    last_name: "0",
    gender: "Male",
    landline: "0",
    mobile: "0",
    email: "0@gmail.com",
    city: "0",
    country: "Philippines",
    message: "0",
    property_id: properties[0].id,
  };

  const onSubmit = async (
    values: Values,
    actions: { resetForm: () => void }
  ) => {
    setIsSubmitting(true);

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/inquiries`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      actions.resetForm();
      toast.success("Inquiry submitted successfully!");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong!");
    }

    setIsSubmitting(false);
  };

  return (
    <div>
      <div className="flex flex-col">
        <div className="flex flex-col md:flex-row items-start justify-center">
          <div className="w-full text-left max-w-xl">
            <div className="mb-4">
              <h3 className="text-2xl text-primary">Corporate Headquarters</h3>
              <p>
                Filinvest Building, 79 EDSA, Mandaluyong City, 1550 Philippines,
                (63 2) 7-918-8188
              </p>
            </div>

            <div>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {(props: FormikProps<any>) => (
                  <Form className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex justify-between gap-2">
                        <div className="flex flex-col w-full">
                          <Field name="first_name">
                            {({ field, meta }: FieldProps) => (
                              <div>
                                <Input
                                  {...field}
                                  radius="none"
                                  label="First Name"
                                />

                                {meta.touched && meta.error && (
                                  <small className="text-red-500">
                                    {meta.error}
                                  </small>
                                )}
                              </div>
                            )}
                          </Field>
                        </div>

                        <div className="flex flex-col w-full">
                          <Field name="last_name">
                            {({ field, meta }: FieldProps) => (
                              <div>
                                <Input
                                  {...field}
                                  radius="none"
                                  label="Last Name"
                                />

                                {meta.touched && meta.error && (
                                  <small className="text-red-500">
                                    {meta.error}
                                  </small>
                                )}
                              </div>
                            )}
                          </Field>
                        </div>

                        <div className="flex flex-col w-full">
                          <Field name="gender">
                            {({ field, meta }: FieldProps) => (
                              <div>
                                <Select
                                  {...field}
                                  radius="none"
                                  label="Gender"
                                  defaultSelectedKeys={[field.value]}
                                >
                                  <SelectItem key="Male">Male</SelectItem>
                                  <SelectItem key="Female">Female</SelectItem>
                                </Select>

                                {meta.touched && meta.error && (
                                  <small className="text-red-500">
                                    {meta.error}
                                  </small>
                                )}
                              </div>
                            )}
                          </Field>
                        </div>
                      </div>

                      <div className="flex justify-between gap-2">
                        <div className="flex flex-col w-full">
                          <Field name="landline">
                            {({ field, meta }: FieldProps) => (
                              <div>
                                <Input
                                  {...field}
                                  radius="none"
                                  label="Landline"
                                />

                                {meta.touched && meta.error && (
                                  <small className="text-red-500">
                                    {meta.error}
                                  </small>
                                )}
                              </div>
                            )}
                          </Field>
                        </div>

                        <div className="flex flex-col w-full">
                          <Field name="mobile">
                            {({ field, meta }: FieldProps) => (
                              <div>
                                <Input
                                  {...field}
                                  radius="none"
                                  label="Mobile"
                                />

                                {meta.touched && meta.error && (
                                  <small className="text-red-500">
                                    {meta.error}
                                  </small>
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
                                  <small className="text-red-500">
                                    {meta.error}
                                  </small>
                                )}
                              </div>
                            )}
                          </Field>
                        </div>
                      </div>

                      <div className="flex justify-between gap-2">
                        <div className="flex flex-col w-full">
                          <Field name="city">
                            {({ field, meta }: FieldProps) => (
                              <div>
                                <Input {...field} radius="none" label="City" />

                                {meta.touched && meta.error && (
                                  <small className="text-red-500">
                                    {meta.error}
                                  </small>
                                )}
                              </div>
                            )}
                          </Field>
                        </div>

                        <div className="flex flex-col w-full">
                          <Field name="country">
                            {({ field, meta }: FieldProps) => (
                              <div>
                                <Autocomplete
                                  {...field}
                                  radius="none"
                                  label="Country"
                                  onInputChange={(value: string) => {
                                    props.setFieldValue(field.name, value);
                                  }}
                                  onSelectionChange={(
                                    key: React.Key | null
                                  ) => {
                                    props.setFieldValue(field.name, key);
                                  }}
                                  defaultSelectedKey={field.value}
                                >
                                  <AutocompleteItem key="Philippines">
                                    Philippines
                                  </AutocompleteItem>
                                </Autocomplete>

                                {meta.touched && meta.error && (
                                  <small className="text-red-500">
                                    {meta.error}
                                  </small>
                                )}
                              </div>
                            )}
                          </Field>
                        </div>
                      </div>

                      <div className="flex flex-col w-full">
                        <Field name="message">
                          {({ field, meta }: FieldProps) => (
                            <div>
                              <Textarea
                                {...field}
                                radius="none"
                                label="Message"
                              />

                              {meta.touched && meta.error && (
                                <small className="text-red-500">
                                  {meta.error}
                                </small>
                              )}
                            </div>
                          )}
                        </Field>
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
                                <small className="text-red-500">
                                  {meta.error}
                                </small>
                              )}
                            </div>
                          )}
                        </Field>
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
      </div>
    </div>
  );
};

export default InquiryForm;
