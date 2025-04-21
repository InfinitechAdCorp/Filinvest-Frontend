"use client";

import React from "react";
import { Field, FormikProps } from "formik";
import { Checkbox } from "@heroui/react";

type Props = {
  props: FormikProps<any>;
};

const Amenities = ({ props }: Props) => {
  const options = [
    "24-hour Security",
    "Gazebo/Cabana",
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
    <div className="flex flex-col gap-3">
      <h3>Amenities</h3>

      <div className="grid grid-cols-4 gap-3">
        {options.map((option) => (
          <Field name="amenities" as={Checkbox} key={option} value={option}>{option}</Field>
        ))}
      </div>
    </div>
  );
};

export default Amenities;
