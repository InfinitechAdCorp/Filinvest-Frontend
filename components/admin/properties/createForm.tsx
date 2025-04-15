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
  Input,
  Textarea,
  Select,
  SelectItem,
} from "@heroui/react";
import { Formik, Form, Field, ErrorMessage, FormikProps } from "formik";
import { Property as Values } from "@/types/admin";
import { property as rules } from "@/schemas/admin";
import { upsert } from "@/utils/actions";
import { onPostSubmit } from "@/utils/events";

type Props = {
  url: string;
  model: string;
};

const CreateForm = ({ url, model }: Props) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [isSubmitting, setIsSubmitting] = useState(false);

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
  };

  const validationSchema = Yup.object().shape({
    ...rules,
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
          {(onClose) => (
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
                      <div className="flex flex-col gap-3">
                        <div className="flex justify-between gap-2">
                          <div className="flex flex-col w-full">
                            <Field
                              name="name"
                              as={Input}
                              type="text"
                              size="md"
                              variant="bordered"
                              label="Name"
                              labelPlacement="outside"
                              placeholder="Enter Name"
                            />
                            <ErrorMessage
                              name="name"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>

                          <div className="flex flex-col w-full">
                            <Field
                              name="type"
                              as={Select}
                              size="md"
                              variant="bordered"
                              label="Type"
                              labelPlacement="outside"
                              placeholder="Select Type"
                              defaultSelectedKey={props.values.type}
                            >
                              <SelectItem key="Homes">Homes</SelectItem>
                              <SelectItem key="Mid-Rise Condo">
                                Mid-Rise Condo
                              </SelectItem>
                              <SelectItem key="High-Rise Condo">
                                High-Rise Condo
                              </SelectItem>
                            </Field>
                            <ErrorMessage
                              name="type"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
                        </div>

                        <div className="flex justify-between gap-2">
                          <div className="flex flex-col w-full">
                            <Field
                              name="minimum_price"
                              as={Input}
                              type="text"
                              size="md"
                              variant="bordered"
                              label="Minimum Price"
                              labelPlacement="outside"
                              placeholder="Enter Minimum Price"
                            />
                            <ErrorMessage
                              name="minimum_price"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>

                          <div className="flex flex-col w-full">
                            <Field
                              name="maximum_price"
                              as={Input}
                              type="text"
                              size="md"
                              variant="bordered"
                              label="Maximum Price"
                              labelPlacement="outside"
                              placeholder="Enter Maximum Price"
                            />
                            <ErrorMessage
                              name="maximum_price"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
                        </div>

                        <div className="flex flex-col w-full">
                          <Field
                            name="location"
                            as={Input}
                            type="text"
                            size="md"
                            variant="bordered"
                            label="Location"
                            labelPlacement="outside"
                            placeholder="Enter Location"
                          />
                          <ErrorMessage
                            name="location"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>

                        <div className="flex flex-col w-full">
                          <Field
                            name="map"
                            as={Textarea}
                            size="md"
                            variant="bordered"
                            label="Map"
                            labelPlacement="outside"
                            placeholder="Enter Map"
                          />
                          <ErrorMessage
                            name="map"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>

                        <div className="flex justify-between gap-2">
                          <div className="flex flex-col w-full">
                            <Field
                              name="minimum_area"
                              as={Input}
                              type="text"
                              size="md"
                              variant="bordered"
                              label="Minimum Area"
                              labelPlacement="outside"
                              placeholder="Enter Minimum Area"
                            />
                            <ErrorMessage
                              name="minimum_area"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>

                          <div className="flex flex-col w-full">
                            <Field
                              name="maximum_area"
                              as={Input}
                              type="text"
                              size="md"
                              variant="bordered"
                              label="Maximum Area"
                              labelPlacement="outside"
                              placeholder="Enter Maximum Area"
                            />
                            <ErrorMessage
                              name="maximum_area"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
                        </div>

                        <div className="flex flex-col w-full">
                          <Field
                            name="status"
                            as={Select}
                            size="md"
                            variant="bordered"
                            label="Status"
                            labelPlacement="outside"
                            placeholder="Select Status"
                            defaultSelectedKey={props.values.status}
                          >
                            <SelectItem key="RFO">RFO</SelectItem>
                            <SelectItem key="Pre-Selling">
                              Pre-Selling
                            </SelectItem>
                          </Field>
                          <ErrorMessage
                            name="status"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>

                        <div className="flex flex-col w-full">
                          <Field
                            name="description"
                            as={Textarea}
                            size="md"
                            variant="bordered"
                            label="Description"
                            labelPlacement="outside"
                            placeholder="Enter Description"
                          />
                          <ErrorMessage
                            name="description"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        color="primary"
                        type="submit"
                        isLoading={isSubmitting}
                      >
                        Save
                      </Button>
                      <Button color="danger" onPress={onClose}>
                        Cancel
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

export default CreateForm;
