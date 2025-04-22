"use client";

import React, { ChangeEvent, useState } from "react";
import { ErrorMessage, Field, FormikErrors, FormikProps } from "formik";
import { Image, Input } from "@heroui/react";

type Props = {
  props: FormikProps<any>;
};

const Images = ({ props }: Props) => {
  // const initialLogoPreview = props.values.logo
  //   ? URL.createObjectURL(props.values.logo)
  //   : "";
  // const initialImagesPreview = Array.from(props.values.images).map((file) =>
  //   URL.createObjectURL(file as File)
  // );

  const [logoPreview, setLogoPreview] = useState("");
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);

  const onLogoChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (
      field: string,
      value: File | null
    ) => Promise<void | FormikErrors<any>>
  ) => {
    const files = event.target.files;
    if (files) {
      setLogoPreview(files[0] ? URL.createObjectURL(files[0]) : "");
      await setFieldValue("logo", files[0]);
    }
  };

  const onImagesChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (
      field: string,
      value: FileList | null
    ) => Promise<void | FormikErrors<any>>
  ) => {
    const files = event.target.files;
    if (files) {
      const urls = Array.from(files).map((file) => URL.createObjectURL(file));
      setImagesPreview(urls);
      await setFieldValue("images", files);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col w-full">
        <Field
          name="logo"
          as={Input}
          type="file"
          size="md"
          variant="bordered"
          label="Logo"
          labelPlacement="outside"
          placeholder="Enter Logo"
          value={undefined}
          onChange={async (e: ChangeEvent<HTMLInputElement>) => {
            await onLogoChange(e, props.setFieldValue);
          }}
        >
          <ErrorMessage
            name="logo"
            component="div"
            className="text-red-500 text-sm"
          />
        </Field>
      </div>

      {logoPreview && (
        <div className="flex flex-wrap justify-center gap-3">
          <Image
            src={logoPreview}
            alt="Preview"
            className="max-w-[8rem] h-32 object-cover rounded-md"
          />
        </div>
      )}

      <div className="flex flex-col w-full">
        <Field
          name="images"
          as={Input}
          type="file"
          multiple
          size="md"
          variant="bordered"
          label="Images"
          labelPlacement="outside"
          placeholder="Enter Images"
          value={undefined}
          onChange={async (e: ChangeEvent<HTMLInputElement>) => {
            await onImagesChange(e, props.setFieldValue);
          }}
        >
          <ErrorMessage
            name="images"
            component="div"
            className="text-red-500 text-sm"
          />
        </Field>
      </div>

      {imagesPreview && (
        <div className="flex flex-wrap justify-center gap-3">
          {imagesPreview.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt="Preview"
              className="max-w-[8rem] h-32 object-cover rounded-md"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Images;
