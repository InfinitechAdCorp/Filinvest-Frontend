"use client";

import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Input, Button } from "@heroui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Subscriber as Values } from "@/types/admin";
import { subscriber as rules } from "@/schemas/admin";
import axios from "axios";
import toast from "react-hot-toast";
import { get as getCookies } from "@/utils/auth";

const SubscriberForm = () => {
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
    email: "",
  };

  const validationSchema = Yup.object().shape({
    ...rules,
  });

  const onSubmit = async (
    values: Values,
    actions: { resetForm: () => void },
  ) => {
    setIsSubmitting(true);

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/subscribers`,
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
      toast.success("Subscribed Successfully");

      sendEmail(values.email);
    } catch (error) {
      console.error(error);
      toast.error("Something Went Wrong");
    }

    setIsSubmitting(false);
  };

  const sendEmail = async (email: string) => {
    try {
      await axios.post(
        "/api/subscribers/subscribe",
        { email: email },
        {
          headers: {
            Authorization: `Bearer ${apiToken}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      );
    } catch (error) {
      console.error(error);
    }
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
            <div className="mt-4 flex flex-col gap-3">
              <div className="flex w-full flex-col">
                <Field
                  name="email"
                  as={Input}
                  type="text"
                  variant="underlined"
                  placeholder="Email Address"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-sm text-red-500"
                />
              </div>

              <Button
                type="submit"
                className="w-[45%] bg-primary text-white"
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
