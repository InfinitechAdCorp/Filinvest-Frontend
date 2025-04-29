import * as Yup from "yup";

export const login = Yup.object().shape({
  username: Yup.string().trim().required("Username is required"),
  password: Yup.string().trim().required("Password is required"),
});

export const destroy = Yup.object().shape({
  id: Yup.string().trim().required("ID is required"),
});

export const setStatus = Yup.object().shape({
  id: Yup.string().trim().required("ID is required"),
  status: Yup.string().trim().required("Status is required"),
});

export const faq = {
  question: Yup.string().trim().required("Question is required"),
  answer: Yup.string().trim().required("Answer is required"),
};

export const testimonial = {
  name: Yup.string().trim().required("Name is required"),
  message: Yup.string().trim().required("Message is required"),
};

export const article = {
  name: Yup.string().trim().required("Name is required"),
  type: Yup.string().trim().required("Type is required"),
  date: Yup.date()
    .typeError("Date must be a valid date")
    .required("Date is required"),
  description: Yup.string().trim().required("Description is required"),
};

export const inquiry = {
  first_name: Yup.string().trim().required("First Name is required"),
  last_name: Yup.string().trim().required("Last Name is required"),
  mobile: Yup.string().trim().required("Mobile is required"),
  email: Yup.string()
    .trim()
    .email("Email must be a valid email")
    .required("Email is required"),
  property_id: Yup.string().trim().required("Property is required"),
  message: Yup.string().trim().required("Message is required"),
};

export const appointment = {
  first_name: Yup.string().trim().required("First Name is required"),
  last_name: Yup.string().trim().required("Last Name is required"),
  mobile: Yup.string().trim().required("Mobile is required"),
  email: Yup.string()
    .trim()
    .email("Email must be a valid email")
    .required("Email is required"),
  date: Yup.date()
    .typeError("Date must be a valid date")
    .required("Date is required"),
  time: Yup.string().trim().required("Time is required"),
  property_id: Yup.string().trim().required("Property is required"),
  message: Yup.string().trim().required("Message is required"),
};

export const subscriber = {
  email: Yup.string()
    .trim()
    .email("Email must be a valid email")
    .required("Email is required"),
};

export const property = {
  name: Yup.string().trim().required("Name is required"),
  type: Yup.string().trim().required("Type is required"),
  location: Yup.string().trim().required("Location is required"),
  map: Yup.string().trim().nullable(),
  minimum_price: Yup.number()
    .typeError("Minimum Price must be a number")
    .required("Minimum Price is required")
    .min(1, "Minimum Price must be greater than 0"),
  maximum_price: Yup.number()
    .typeError("Maximum Price must be a number")
    .required("Maximum Price is required")
    .min(
      Yup.ref("minimum_price"),
      "Maximum Price must be greater than Minimum Price",
    ),
  minimum_area: Yup.number()
    .typeError("Minimum Area must be a number")
    .required("Minimum Area is required")
    .min(1, "Minimum Area must be greater than 0"),
  maximum_area: Yup.number()
    .typeError("Maximum Area must be a number")
    .required("Maximum Area is required")
    .min(
      Yup.ref("minimum_area"),
      "Maximum Area must be greater than Minimum Area",
    ),
  status: Yup.string().trim().required("Status is required"),
  description: Yup.string().trim().required("Description is required"),
  amenities: Yup.array()
    .typeError("Amenities must be an array")
    .required("Amenities is required")
    .min(1, "Amenities is required"),
};

export const offering = {
  property_id: Yup.string().trim().required("Property is required"),
  type: Yup.string().trim().required("Type is required"),
  minimum_area: Yup.number()
    .typeError("Minimum Area must be a number")
    .required("Minimum Area is required")
    .min(1, "Minimum Area must be greater than 0"),
  maximum_area: Yup.number()
    .typeError("Maximum Area must be a number")
    .required("Maximum Area is required")
    .min(
      Yup.ref("minimum_area"),
      "Maximum Area must be greater than Minimum Area",
    ),
};
