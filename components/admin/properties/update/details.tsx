"use client";

import React from "react";
import {
  Input,
  Textarea,
  Select,
  SelectItem,
  NumberInput,
} from "@heroui/react";
import { Field, ErrorMessage, FormikProps } from "formik";

type Props = {
  props: FormikProps<any>;
};

const Details = ({ props }: Props) => {
  return (
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
            defaultSelectedKeys={[props.values.type]}
          >
            <SelectItem key="Home">Home</SelectItem>
            <SelectItem key="Mid-Rise Condo">Mid-Rise Condo</SelectItem>
            <SelectItem key="High-Rise Condo">High-Rise Condo</SelectItem>
          </Field>
          <ErrorMessage
            name="type"
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
            name="minimum_price"
            as={Input}
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
      <div className="flex justify-between gap-2">
        <div className="flex flex-col w-full">
          <Field
            name="minimum_area"
            as={Input}
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
          defaultSelectedKeys={[props.values.status]}
        >
          <SelectItem key="RFO">RFO</SelectItem>
          <SelectItem key="Pre-Selling">Pre-Selling</SelectItem>
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
  );
};

export default Details;
