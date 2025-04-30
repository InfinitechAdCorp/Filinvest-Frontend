"use client";

import { setStatus as validationSchema } from "@/schemas/admin";
import { Appointment as Record, SetStatus as Values } from "@/types/globals";
import { get as getCookies } from "@/utils/auth";
import { onPostSubmit } from "@/utils/events";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import axios from "axios";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";

type Props = {
  url: string;
  model: string;
  record: Record;
};

const DeclineForm = ({ url, model, record }: Props) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
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
    id: record.id,
    status: "Declined",
  };

  const onSubmit = async (
    values: Values,
    { resetForm }: { resetForm: () => void },
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
            Authorization: `Bearer ${apiToken}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      );
      return { code: 200, message: `Declined ${model}` };
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
      status: "Declined",
    };

    try {
      await axios.post("/api/appointments/set-status", values, {
        headers: {
          Authorization: `Bearer ${apiToken}`,
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
        color="danger"
        title="Decline"
        isDisabled={record.status != "Pending"}
        onPress={onOpen}
        startContent={<FaXmark size={14} color="white" />}
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
                    <ModalHeader>Decline {model}</ModalHeader>
                    <ModalBody>
                      <h6>
                        Are you sure that you want to decline this {model}?
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

export default DeclineForm;
