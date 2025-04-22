import * as Yup from "yup";

export const destroy = Yup.object().shape({
  id: Yup.string().trim().required("ID is a required field"),
});

export const faq = {
  question: Yup.string().trim().required("Question is a required field"),
  answer: Yup.string().trim().required("Answer is a required field"),
};

export const testimonial = {
  name: Yup.string().trim().required("Name is a required field"),
  message: Yup.string().trim().required("Message is a required field"),
};

export const article = {
  name: Yup.string().trim().required("Name is a required field"),
  type: Yup.string().trim().required("Type is a required field"),
  date: Yup.date()
    .typeError("Date must be a valid date")
    .required("Date is a required field"),
  description: Yup.string().trim().required("Description is a required field"),
};

export const inquiry = {
  first_name: Yup.string().trim().required("First Name is a required field"),
  last_name: Yup.string().trim().required("Last Name is a required field"),
  mobile: Yup.string().trim().required("Mobile is a required field"),
  email: Yup.string()
    .trim()
    .email("Email must be a valid email")
    .required("Email is a required field"),
  property_id: Yup.string().trim().required("Property is a required field"),
  message: Yup.string().trim().required("Message is a required field"),
};

export const appointment = {
  first_name: Yup.string().trim().required("First Name is a required field"),
  last_name: Yup.string().trim().required("Last Name is a required field"),
  mobile: Yup.string().trim().required("Mobile is a required field"),
  email: Yup.string()
    .trim()
    .email("Email must be a valid email")
    .required("Email is a required field"),
  date: Yup.date()
    .typeError("Date must be a valid date")
    .required("Date is a required field"),
  time: Yup.string().trim().required("Time is a required field"),
  property_id: Yup.string().trim().required("Property is a required field"),
  message: Yup.string().trim().required("Message is a required field"),
};

export const subscriber = {
  email: Yup.string()
    .trim()
    .email("Email must be a valid email")
    .required("Email is a required field"),
};

export const property = {
  name: Yup.string().trim().required("Name is a required field"),
  type: Yup.string().trim().required("Type is a required field"),
  location: Yup.string().trim().required("Location is a required field"),
  map: Yup.string().trim().nullable(),
  minimum_price: Yup.number()
    .typeError("Minimum Price must be a number")
    .min(1, "Minimum Price must be greater than 0")
    .required("Minimum Price is a required field"),
  maximum_price: Yup.number()
    .typeError("Maximum Price must be a number")
    .min(1, "Maximum Price must be greater than 0")
    .required("Maximum Price is a required field"),
  minimum_area: Yup.number()
    .typeError("Minimum Area must be a number")
    .min(1, "Minimum Area must be greater than 0")
    .required("Minimum Area is a required field"),
  maximum_area: Yup.number()
    .typeError("Maximum Area must be a number")
    .min(1, "Maximum Area must be greater than 0")
    .required("Maximum Area is a required field"),
  status: Yup.string().trim().required("Status is a required field"),
  description: Yup.string().trim().required("Description is a required field"),
  amenities: Yup.array()
    .typeError("Amenities must be an array")
    .min(1, "Amenities cannot be empty")
    .required("Amenities is a required field"),
};
