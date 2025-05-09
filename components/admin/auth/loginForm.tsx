"use client";

import { login as validationSchema } from "@/schemas/admin";
import { Login as Values } from "@/types/admin";
import { login } from "@/utils/auth";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Input,
} from "@heroui/react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const LoginForm = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues = {
    username: "filinvest_admin",
    password: "password",
  };

  const onSubmit = async (
    values: Values,
    { resetForm }: { resetForm: () => void },
  ) => {
    setIsSubmitting(true);

    const { code, message } = await login(values);
    if (code == 200) {
      resetForm();
      toast.success(message);
      router.push("/admin/dashboard");
    } else {
      toast.error(message);
    }

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
          {() => (
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
