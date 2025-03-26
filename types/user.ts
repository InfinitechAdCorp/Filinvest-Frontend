export type SubmitInquiry = {
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

export type Property = {
  id: string;
  name: string;
  type: string;
  minimum_price: number;
  maximum_price: number;
  location: string;
  minimum_area: number;
  maximum_area: number;
  status: string;
  description: string;
  logo: string;
  images: string;
  amenities: string;
};

export type Testimonial = {
  id: string;
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
};
