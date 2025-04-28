"use client";

import React from "react";
import { ErrorMessage, Field, FormikProps } from "formik";
import { Checkbox } from "@heroui/react";

type Props = {
  props: FormikProps<any>;
};

const Amenities = ({ props }: Props) => {
  const options = [
    "24-Hour Security",
    "Gazebo / Cabana",
    "Landscaped Gardens",
    "Pool Deck",
    "Pool Shower",
    "Arrival Court",
    "View Deck",
    "Convenience Store",
    "Fitness Gym",
    "Grill Pits",
    "Jogging Path",
    "Laundry Station",
    "Lounge Area",
    "Perimeter Fence",
    "Co-working Space",
    "Tree Court",
    "Water Feature",
    "Water Station",
    "Sky Promenade",
    "WiFi Access",
  ].sort();

  return (
    <div className="flex flex-col gap-2">
      <h3>Amenities</h3>

      <div className="grid grid-cols-4 gap-3">
        {options.map((option) => (
          <Field
            key={option}
            name="amenities"
            as={Checkbox}
            value={option}
            isSelected={props.values.amenities.includes(option)}
          >
            {option}
          </Field>
        ))}
      </div>

      <ErrorMessage
        name="amenities"
        component="div"
        className="text-sm text-red-500"
      />
    </div>
  );
};

export default Amenities;
