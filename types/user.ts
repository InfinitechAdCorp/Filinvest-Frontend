export type CreateInquiry = {
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
};

export type Offering = {
  id: string;
  type: string;
  minimum_area: number;
  maximum_area: number;
  image: string;
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

export type FAQ = {
  id: string;
  question: string;
  answer: string;
};
