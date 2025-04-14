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

export const inquiry = {
  first_name: Yup.string().required(),
  last_name: Yup.string().required(),
  gender: Yup.string().required(),
  landline: Yup.string().required(),
  mobile: Yup.string().required(),
  email: Yup.string().email().required(),
  city: Yup.string().required(),
  country: Yup.string().required(),
  message: Yup.string().required(),
  property_id: Yup.string().required(),
};

export const appointment = {
  first_name: Yup.string().required(),
  last_name: Yup.string().required(),
  mobile: Yup.string().required(),
  email: Yup.string().email().required(),
  date: Yup.date().required(),
  time: Yup.string().required(),
  property_id: Yup.string().required(),
  message: Yup.string().required(),
};

export const subscriber = {
  email: Yup.string().email().required(),
};
