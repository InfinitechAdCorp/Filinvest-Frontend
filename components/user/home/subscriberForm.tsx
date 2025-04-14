"use client";

import React, { useState } from "react";
import * as Yup from "yup";
import { Input, Button } from "@heroui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Subscriber as Values } from "@/types/admin";
import { subscriber as rules } from "@/schemas/admin";
import axios from "axios";
import toast from "react-hot-toast";

const SubscriberForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues = {
    email: "",
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
        {() => (
          <Form className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-2 lg:mt-11">
              <div className="flex flex-col w-full">
                <Field
                  name="email"
                  as={Input}
                  type="email"
                  variant="underlined"
                  placeholder="Email Address"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

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
