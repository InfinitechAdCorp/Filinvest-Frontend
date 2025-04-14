import { DateValue } from "@heroui/react";
import { Time } from "@internationalized/date";

export type FAQ = {
  id?: string;
  question: string;
  answer: string;
};

export type Inquiry = {
  id?: string;
  first_name: string;
  last_name: string;
  gender: string;
  landline: string;
  mobile: string;
  email: string;
  city: string;
  country: string;
  message: string;
  property_id: string;
};

export type Appointment = {
  id?: string;
  first_name: string;
  last_name: string;
  mobile: string;
  email: string;
  date: DateValue | null;
  time: Time | null;
  property_id: string;
  message: string;
};

export type Subscriber = {
  id?: string;
  email: string;
};
