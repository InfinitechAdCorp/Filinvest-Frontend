import { DateValue } from "@heroui/react";
import { Time } from "@internationalized/date";

export type Counts = {
  properties: number;
  appointments: number;
  inquiries: number;
  subscribers: number;
};

export type FAQ = {
  id?: string;
  question: string;
  answer: string;
};

export type Testimonial = {
  id?: string;
  name: string;
  message: string;
};

export type Article = {
  id?: string;
  name: string;
  type: string;
  date: DateValue | null;
  description: string;
  image: File | string;
};

export type Inquiry = {
  id?: string;
  first_name: string;
  last_name: string;
  mobile: string;
  email: string;
  property_id: string;
  message: string;
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

export type Property = {
  id?: string;
  name: string;
  type: string;
  location: string;
  map: string;
  minimum_price: number | string;
  maximum_price: number | string;
  minimum_area: number | string;
  maximum_area: number | string;
  status: string;
  description: string;
  logo: File | string;
  amenities: string[];
  images: FileList | string;
};

export type Offering = {
  id?: string;
  property_id: string;
  type: string;
  minimum_area: number | string;
  maximum_area: number | string;
  image: File | string;
}