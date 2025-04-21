import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Response = {
  code: number;
  message: string;
  [key: string]: any;
};

export type Destroy = {
  id: string;
};

export type Column = {
  name: string;
  sortable: boolean;
};

export type Property = {
  id: string;
  name: string;
  type: string;
  minimum_price: number;
  maximum_price: number;
  location: string;
  map: string;
  minimum_area: number;
  maximum_area: number;
  status: string;
  description: string;
  isPublished: number;
  isFeatured: number;
  logo: string;
  images: string;
  amenities: string;
  offerings: Offering[];
  created_at: string;
  updated_at: string;
  display_format?: PropertyDisplayFormat;
};

export type PropertyDisplayFormat = {
  name: string;
  logo: string;
  type: string;
  price: string;
  location: string;
  area: string;
  status: string;
  description: string;
};

export type Offering = {
  id: string;
  property_id: string;
  type: string;
  minimum_area: number;
  maximum_area: number;
  image: string;
  created_at: string;
  updated_at: string;
  property: Property;
  display_format?: OfferingDisplayFormat;
};

export type OfferingDisplayFormat = {
  property: string;
  type: string;
  minimum_area: string;
  maximum_area: string;
};

export type Testimonial = {
  id: string;
  name: string;
  message: string;
  isPublished: number;
  created_at: string;
  updated_at: string;
  display_format?: TestimonialDisplayFormat;
};

export type TestimonialDisplayFormat = {
  name: string;
  message: string;
};

export type Article = {
  id: string;
  name: string;
  type: string;
  date: string;
  description: string;
  image: string;
  created_at: string;
  updated_at: string;
  display_format?: ArticleDisplayFormat;
};

export type ArticleDisplayFormat = {
  name: string;
  date: string;
  description: string;
  image: string;
};

export type FAQ = {
  id: string;
  question: string;
  answer: string;
  created_at: string;
  updated_at: string;
  display_format?: FAQDisplayFormat;
};

export type FAQDisplayFormat = {
  question: string;
  answer: string;
};

export type Inquiry = {
  id: string;
  property_id: string;
  first_name: string;
  last_name: string;
  mobile: string;
  email: string;
  message: string;
  created_at: string;
  updated_at: string;
  property: Property;
  display_format: InquiryDisplayFormat;
};

export type InquiryDisplayFormat = {
  first_name: string;
  last_name: string;
  mobile: string;
  email: string;
  property: string;
  message: string;
};

export type Appointment = {
  id: string;
  property_id: string;
  first_name: string;
  last_name: string;
  mobile: string;
  email: string;
  date: string;
  time: string;
  message: string;
  status: string;
  created_at: string;
  updated_at: string;
  property: Property;
  display_format?: AppointmentDisplayFormat;
};

export type AppointmentDisplayFormat = {
  first_name: string;
  last_name: string;
  mobile: string;
  email: string;
  date: string;
  time: string;
  property: string;
  message: string;
  status: string;
};
