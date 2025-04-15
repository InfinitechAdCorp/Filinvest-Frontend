import * as Yup from "yup";

export const destroy = Yup.object().shape({
  id: Yup.string().trim().required("ID is a required field"),
});

export const faq = {
  question: Yup.string().trim().required(),
  answer: Yup.string().trim().required(),
};

export const testimonial = {
  name: Yup.string().trim().required(),
  message: Yup.string().trim().required(),
};

export const article = {
  name: Yup.string().trim().required(),
  type: Yup.string().trim().required(),
  date: Yup.date().required(),
  description: Yup.string().trim().required(),
};

export const inquiry = {
  first_name: Yup.string().trim().required(),
  last_name: Yup.string().trim().required(),
  gender: Yup.string().trim().required(),
  landline: Yup.string().trim().required(),
  mobile: Yup.string().trim().required(),
  email: Yup.string().trim().email().required(),
  city: Yup.string().trim().required(),
  country: Yup.string().trim().required(),
  message: Yup.string().trim().required(),
  property_id: Yup.string().trim().required(),
};

export const appointment = {
  first_name: Yup.string().trim().required(),
  last_name: Yup.string().trim().required(),
  mobile: Yup.string().trim().required(),
  email: Yup.string().trim().email().required(),
  date: Yup.date().required(),
  time: Yup.string().trim().required(),
  property_id: Yup.string().trim().required(),
  message: Yup.string().trim().required(),
};

export const subscriber = {
  email: Yup.string().trim().email().required(),
};

export const property = {
  name: Yup.string().trim().required(),
  type: Yup.string().trim().required(),
  minimum_price: Yup.number().min(1).required(),
  maximum_price: Yup.number().min(1).required(),
  location: Yup.string().trim().required(),
  map: Yup.string().trim().required(),
  minimum_area: Yup.number().min(1).required(),
  maximum_area: Yup.number().min(1).required(),
  status: Yup.string().trim().required(),
  description: Yup.string().trim().required(),
  amenties: Yup.array().min(1).required(),
};
