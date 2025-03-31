import * as Yup from "yup";

export const CreateInquiry = Yup.object().shape({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  gender: Yup.string().required("Gender is required"),
  landline: Yup.string().required("Landline is required"),
  mobile: Yup.string().required("Mobile is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  city: Yup.string().required("City is required"),
  country: Yup.string().required("Country is required"),
  message: Yup.string().required("Message is required"),
  property_id: Yup.string().required("Property is required"),
});

export const CreateAppointment = Yup.object().shape({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  mobile: Yup.string().required("Mobile is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  date: Yup.date()
    .typeError("Date must be a valid date")
    .required("Date is a required field"),
  time: Yup.string().required("Time is required"),
  property_id: Yup.string().required("Property is required"),
  message: Yup.string().required("Message is required"),
});
