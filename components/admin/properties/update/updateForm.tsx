"use client";

import React, { useState } from "react";
import * as Yup from "yup";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { Formik, Form, FormikProps } from "formik";
import { Property as Record } from "@/types/globals";
import { Property as Values } from "@/types/admin";
import { property as rules } from "@/schemas/admin";
import { upsert } from "@/utils/actions";
import { onPostSubmit } from "@/utils/events";
import Details from "./details";
import Amenities from "./amenities";
import Images from "./images";
import { FaPenToSquare } from "react-icons/fa6";

type Props = {
  url: string;
  model: string;
  record: Record;
};

const UpdateForm = ({ url, model, record }: Props) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);

  const initialValues = {
    id: record.id,
    name: record.name,
    type: record.type,
    location: record.location,
    map: record.map,
    minimum_price: record.minimum_price,
    maximum_price: record.maximum_price,
    minimum_area: record.minimum_area,
    maximum_area: record.maximum_area,
    status: record.status,
    description: record.description,
    logo: "",
    images: "",
    amenities: JSON.parse(record.amenities),
  };

  const validationSchema = Yup.object().shape({
    ...rules,
    id: Yup.string().trim().required("ID is required"),
    logo: Yup.mixed().nullable(),
    images: Yup.mixed().nullable(),
  });

  const onSubmit = async (
    values: Values,
    { resetForm }: { resetForm: () => void }
  ) => {
    setIsSubmitting(true);

    const { code, message } = await upsert(url, model, "Update", values);
    await onPostSubmit(url, code, message, resetForm, onClose);

    setIsSubmitting(false);
  };

  return (
    <>
      <Button
        size="sm"
        color="primary"
        isIconOnly
        title="Edit"
        onPress={onOpen}
        startContent={<FaPenToSquare size={14} color="white" />}
      ></Button>

      <Modal
        size={step == 2 ? "4xl" : "lg"}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {() => (
            <>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {(props: FormikProps<any>) => (
                  <Form>
                    <ModalHeader>Edit {model}</ModalHeader>
                    <ModalBody>
                      {step == 1 && <Details props={props} />}
                      {step == 2 && <Amenities props={props} />}
                      {step == 3 && <Images props={props} record={record} />}
                    </ModalBody>
                    <ModalFooter>
                      {step != 1 && (
                        <Button
                          color="primary"
                          type="button"
                          onPress={() => setStep((prev) => --prev)}
                        >
                          Prev
                        </Button>
                      )}

                      {step != 3 && (
                        <Button
                          color="primary"
                          type="button"
                          onPress={() => setStep((prev) => ++prev)}
                        >
                          Next
                        </Button>
                      )}

                      {step == 3 && (
                        <Button
                          color="primary"
                          type="submit"
                          isLoading={isSubmitting}
                        >
                          Update
                        </Button>
                      )}
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

export default UpdateForm;
