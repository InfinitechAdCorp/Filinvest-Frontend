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
import { FaXmark, FaCheck } from "react-icons/fa6";
import { onPostSubmit } from "@/utils/events";
import axios from "axios";

type Props = {
  url: string;
  model: string;
  record: Record;
};

const SetStatusForm = ({ url, model, record }: Props) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues = {
    id: record.id,
    status: record.status == "Accepted" ? "Declined" : "Accepted",
  };

  const onSubmit = async (
    values: Values,
    { resetForm }: { resetForm: () => void }
  ) => {
    setIsSubmitting(true);

    const { code, message } = await setStatus(url, model, values);
    await onPostSubmit(url, code, message, resetForm, onClose);

    setIsSubmitting(false);
  };

  const setStatus = async (url: string, model: string, values: Values) => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/${url}/set-status`,
        values,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      return { code: 200, message: `Updated Status of ${model}` };
    } catch (error) {
      console.error(error);
      return { code: 500, message: "Something Went Wrong", error: error };
    }
  };

  return (
    <>
      <Button
        size="sm"
        isIconOnly
        color={record.status == "Accepted" ? "danger" : "success"}
        title={record.status == "Accepted" ? "Decline" : "Accept"}
        onPress={onOpen}
        startContent={
          record.status == "Accepted" ? (
            <FaXmark size={14} />
          ) : (
            <FaCheck size={14} />
          )
        }
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
                    <ModalHeader>
                      {record.status == "Accepted" ? "Decline" : "Accept"}{" "}
                      {model}
                    </ModalHeader>
                    <ModalBody>
                      <h6>
                        Are you sure that you want to{" "}
                        {record.status == "Accepted" ? "decline" : "accept"}{" "}
                        this
                        {model}?
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

export default SetStatusForm;
