"use client";

import React, { ChangeEvent, useState } from "react";
import * as Yup from "yup";
import {
  Button,
  Input,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
} from "@heroui/react";
import { Formik, Form, Field, ErrorMessage, FormikProps } from "formik";
import { Login as Values } from "@/types/admin";
import { login as validationSchema } from "@/schemas/admin";
import { onPostSubmit } from "@/utils/events";

const LoginForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues = {
    username: "",
    password: "",
  };

  const onSubmit = async (
    values: Values,
    { resetForm }: { resetForm: () => void },
  ) => {
    setIsSubmitting(true);

    setIsSubmitting(false);
  };

  return (
    <>
      <Card className="m-5 w-[30rem] p-5 md:m-7">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(props: FormikProps<any>) => (
            <Form>
              <CardHeader>
                <div className="flex w-full justify-center">
                  <Image
                    src="/images/logo.png"
                    className="h-[7rem]"
                    alt="logo"
                  />
                </div>
              </CardHeader>
              <CardBody>
                <div className="flex flex-col gap-3">
                  <div className="flex w-full flex-col">
                    <Field
                      name="username"
                      as={Input}
                      type="text"
                      size="md"
                      variant="bordered"
                      label="Username"
                      labelPlacement="outside"
                      placeholder="Enter Username"
                    />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="text-sm text-red-500"
                    />
                  </div>

                  <div className="flex w-full flex-col">
                    <Field
                      name="password"
                      as={Input}
                      type="password"
                      size="md"
                      variant="bordered"
                      label="Password"
                      labelPlacement="outside"
                      placeholder="Enter Password"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-sm text-red-500"
                    />
                  </div>
                </div>
              </CardBody>
              <CardFooter>
                <Button color="primary" type="submit" isLoading={isSubmitting}>
                  Login
                </Button>
              </CardFooter>
            </Form>
          )}
        </Formik>
      </Card>
    </>
  );
};

export default LoginForm;
