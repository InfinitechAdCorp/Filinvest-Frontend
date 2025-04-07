import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Column = {
  key: string;
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
  substatus: string;
  description: string;
  isPublished: number;
  isFeatured: number;
  logo: string;
  images: string;
  amenities: string;
  offerings: Offering[];
  created_at: string;
  updated_at: string;
};

export type Offering = {
  id: string;
  type: string;
  minimum_area: number;
  maximum_area: number;
  image: string;
  created_at: string;
  updated_at: string;
};

export type Testimonial = {
  id: string;
  name: string;
  message: string;
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
