"use client";

import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { Formik, Form } from "formik";
import { Appointment as Record } from "@/types/globals";
import { setStatus as validationSchema } from "@/schemas/admin";
import { SetStatus as Values } from "@/types/globals";
import { FaCheck } from "react-icons/fa6";
import { onPostSubmit } from "@/utils/events";
import axios from "axios";

type Props = {
  url: string;
  model: string;
  record: Record;
};

const AcceptForm = ({ url, model, record }: Props) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues = {
    id: record.id,
    status: "Accepted",
  };

  const onSubmit = async (
    values: Values,
    { resetForm }: { resetForm: () => void }
  ) => {
    setIsSubmitting(true);

    const { code, message } = await setStatus(url, model, values);
    await onPostSubmit(url, code, message, resetForm, onClose);
    sendEmail(record);

    setIsSubmitting(false);
  };

  const setStatus = async (url: string, model: string, values: Values) => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/${url}/set-status`,
        values,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      return { code: 200, message: `Accepted ${model}` };
    } catch (error) {
      console.error(error);
      return { code: 500, message: "Something Went Wrong", error: error };
    }
  };

  const sendEmail = async (record: Record) => {
    const values = {
      email: record.email,
      property: record.property.name,
      date: record.display_format!.date,
      time: record.display_format!.time,
      status: "Accepted",
    };

    try {
      await axios.post("/api/appointments/set-status", values, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button
        size="sm"
        isIconOnly
        color="success"
        title="Accept"
        isDisabled={record.status != "Pending"}
        onPress={onOpen}
        startContent={<FaCheck size={14} color="white" />}
      ></Button>

      <Modal size="md" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {() => (
                  <Form>
                    <ModalHeader>Accept {model}</ModalHeader>
                    <ModalBody>
                      <h6>
                        Are you sure that you want to accept this {model}?
                      </h6>
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        color="primary"
                        type="submit"
                        isLoading={isSubmitting}
                      >
                        Yes
                      </Button>
                      <Button color="danger" onPress={onClose}>
                        No
                      </Button>
                    </ModalFooter>
                  </Form>
                )}
              </Formik>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AcceptForm;
