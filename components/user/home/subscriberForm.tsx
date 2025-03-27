"use client";

import React, { useState } from "react";
import { Input, Button } from "@heroui/react";
import { Formik, FormikProps, Form, Field, FieldProps } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";

const SubscriberForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues = {
    email: "1@gmail.com",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const onSubmit = async (
    values: { email: string },
    actions: { resetForm: () => void }
  ) => {
    setIsSubmitting(true);

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/subscribers`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      actions.resetForm();
      toast.success("Subscribed successfully!");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong!");
    }

    setIsSubmitting(false);
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(props: FormikProps<any>) => (
          <Form className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-2 lg:mt-11">
              <Field name="email">
                {({ field, meta }: FieldProps) => (
                  <div>
                    <Input
                      {...field}
                      placeholder="Email Address"
                      type="email"
                      variant="underlined"
                    />

                    {meta.touched && meta.error && (
                      <small className="text-red-500">{meta.error}</small>
                    )}
                  </div>
                )}
              </Field>

              <Button
                type="submit"
                className="bg-primary text-white"
                isLoading={isSubmitting}
              >
                Subscribe
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SubscriberForm;
