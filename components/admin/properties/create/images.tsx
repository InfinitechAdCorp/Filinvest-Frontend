"use client";

import React, { ChangeEvent, useState } from "react";
import { ErrorMessage, Field, FormikErrors, FormikProps } from "formik";
import { Image, Input } from "@heroui/react";

type Props = {
  props: FormikProps<any>;
};

const Images = ({ props }: Props) => {
  const initialLogoPreview = props.values.logo
    ? URL.createObjectURL(props.values.logo)
    : "";
  const initialImagesPreview = Array.from(props.values.images).map((file) =>
    URL.createObjectURL(file as File),
  );

  const [logoPreview, setLogoPreview] = useState(initialLogoPreview);
  const [imagesPreview, setImagesPreview] = useState<string[] | string>(
    initialImagesPreview,
  );

  const onLogoChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (
      field: string,
      value: File | null,
    ) => Promise<void | FormikErrors<any>>,
  ) => {
    const files = event.target.files;
    const isValid = files && files[0];
    setLogoPreview(isValid ? URL.createObjectURL(files[0]) : "");
    await setFieldValue("logo", isValid ? files[0] : null);
  };

  const onImagesChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (
      field: string,
      value: FileList | "",
    ) => Promise<void | FormikErrors<any>>,
  ) => {
    const files = event.target.files;
    const isValid = files && Array.from(files).every((file) => file);
    setImagesPreview(
      isValid ? Array.from(files).map((file) => URL.createObjectURL(file)) : "",
    );
    await setFieldValue("images", isValid ? files : "");
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex w-full flex-col">
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
        ></Field>
        <ErrorMessage
          name="logo"
          component="div"
          className="text-sm text-red-500"
        />
      </div>

      {logoPreview && (
        <div className="flex flex-wrap justify-center gap-3">
          <Image
            src={logoPreview}
            alt="Preview"
            className="h-32 max-w-[8rem] rounded-md object-cover"
          />
        </div>
      )}

      <div className="flex w-full flex-col">
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
        ></Field>
        <ErrorMessage
          name="images"
          component="div"
          className="text-sm text-red-500"
        />
      </div>

      {Array.isArray(imagesPreview) && (
        <div className="flex flex-wrap justify-center gap-3">
          {imagesPreview.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt="Preview"
              className="h-32 max-w-[8rem] rounded-md object-cover"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Images;
