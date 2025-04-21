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
import { Property as Values } from "@/types/admin";
import { property as rules } from "@/schemas/admin";
import { upsert } from "@/utils/actions";
import { onPostSubmit } from "@/utils/events";
import Details from "./details";
import Amenities from "./amenities";
import Images from "./images";

type Props = {
  url: string;
  model: string;
};

const CreateForm = ({ url, model }: Props) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);

  const initialValues = {
    name: "",
    type: "",
    minimum_price: "",
    maximum_price: "",
    location: "",
    map: "",
    minimum_area: "",
    maximum_area: "",
    status: "",
    description: "",
    logo: "",
    amenities: [],
    images: "",
  };

  const validationSchema = Yup.object().shape({
    ...rules,
    images: Yup.mixed().required("Images is a required field"),
  });

  const onSubmit = async (
    values: Values,
    { resetForm }: { resetForm: () => void }
  ) => {
    setIsSubmitting(true);

    const { code, message } = await upsert(url, model, "Create", values);
    await onPostSubmit(url, code, message, resetForm, onClose);

    setIsSubmitting(false);
  };

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        Add {model}
      </Button>

      <Modal size="xl" isOpen={isOpen} onOpenChange={onOpenChange}>
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
                    <ModalHeader>Add {model}</ModalHeader>
                    <ModalBody>
                      {step == 1 && <Details props={props} />}
                      {step == 2 && <Amenities props={props} />}
                      {step == 3 && <Images props={props} />}
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
                          Save
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

export default CreateForm;
