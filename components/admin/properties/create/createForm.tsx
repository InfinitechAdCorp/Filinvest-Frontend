"use client";

import { property as rules } from "@/schemas/admin";
import { Property as Values } from "@/types/admin";
import { upsert } from "@/utils/actions";
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
import { Form, Formik, FormikProps } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import Amenities from "./amenities";
import Details from "./details";
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
    location: "",
    map: "",
    minimum_price: "",
    maximum_price: "",
    minimum_area: "",
    maximum_area: "",
    status: "",
    description: "",
    logo: "",
    images: "",
    amenities: [],
  };

  const validationSchema = Yup.object().shape({
    ...rules,
    logo: Yup.mixed().required("Logo is required"),
    images: Yup.mixed().required("Images is required"),
  });

  const onSubmit = async (
    values: Values,
    { resetForm }: { resetForm: () => void },
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
